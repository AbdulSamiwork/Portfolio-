import { API_BASE_URL, AUTH_KEY } from './apiClient';

export function compressImage(imgFile) {
  return new Promise((resolve) => {
    if (!imgFile.type.startsWith('image/')) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/webp', 0.82);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(null);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(imgFile);
  });
}

export function readFileAsDataUrl(rawFile) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(rawFile);
  });
}

export async function uploadFile(file, authToken) {
  if (!file) return null;

  let localDataUrl = null;
  if (file.type.startsWith('image/')) {
    localDataUrl = await compressImage(file);
  }
  if (!localDataUrl) {
    localDataUrl = await readFileAsDataUrl(file);
  }

  // 1. PRIMARY: PHP Backend Upload (Server-side Cloudinary via cURL)
  try {
    const formData = new FormData();
    formData.append('file', file);
    const headers = {};
    const token = authToken || localStorage.getItem(AUTH_KEY);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['X-Auth-Token'] = token;
    }
    const res = await fetch(`${API_BASE_URL}/endpoints/upload.php`, {
      method: 'POST',
      headers,
      body: formData,
    });
    const json = await res.json().catch(() => null);
    if (res.ok && json && json.status === 'success' && json.url) {
      if (json.url.startsWith('https://') || json.url.startsWith('http://')) {
        console.log(`[Upload] Success via ${json.source || 'backend'}: ${json.url.substring(0, 80)}...`);
        return json.url;
      }
    }
  } catch (e) {
    console.warn('[PHP Backend upload error, trying Cloudinary direct]:', e);
  }

  // 2. FALLBACK: Direct Cloudinary CDN Upload from Browser
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

    const cloudFormData = new FormData();
    cloudFormData.append('file', file);
    cloudFormData.append('upload_preset', uploadPreset);

    const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: cloudFormData,
    });

    if (cloudRes.ok) {
      const cloudData = await cloudRes.json();
      if (cloudData && cloudData.secure_url) {
        console.log('[Upload] Success via Cloudinary direct:', cloudData.secure_url.substring(0, 80));
        return cloudData.secure_url;
      }
    }
  } catch (cloudErr) {
    console.warn('[Cloudinary Direct Upload Error]:', cloudErr);
  }

  // 3. LAST RESORT: Local DataURL Fallback
  console.warn('[Upload] All upload strategies failed, using local DataURL fallback');
  return localDataUrl;
}
