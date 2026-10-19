import { useState, useEffect } from 'react';

function dataUrlToBlob(dataUrl) {
  try {
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    console.error('Failed to convert DataURL to Blob:', e);
    return null;
  }
}

export function useResumePreview(resumeUrl, heroName) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!resumeUrl) return;

    if (resumeUrl.startsWith('data:')) {
      const blob = dataUrlToBlob(resumeUrl);
      if (blob) {
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
        return () => URL.revokeObjectURL(url);
      }
    } else if (resumeUrl.includes('res.cloudinary.com') && resumeUrl.endsWith('.pdf')) {
      let cancelled = false;
      (async () => {
        try {
          const res = await fetch(resumeUrl, { mode: 'cors' });
          if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
          const arrayBuffer = await res.arrayBuffer();
          if (cancelled) return;
          const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(pdfBlob);
          setBlobUrl(url);
        } catch (e) {
          console.warn('[ResumeModal] Could not fetch Cloudinary PDF for preview:', e);
          setBlobUrl(null);
        }
      })();
      return () => { cancelled = true; };
    } else {
      setBlobUrl(null);
    }
  }, [resumeUrl]);

  const getDocumentName = () => {
    const defaultName = `${(heroName || 'Abdul_Sami').replace(/\s+/g, '_')}_Resume.pdf`;
    if (!resumeUrl || resumeUrl.startsWith('data:') || resumeUrl.startsWith('blob:')) {
      return defaultName;
    }
    if (resumeUrl.includes('res.cloudinary.com')) {
      return defaultName;
    }
    const clean = resumeUrl.split('?')[0].split('#')[0].split('/').pop();
    if (!clean || clean.length > 35) {
      return defaultName;
    }
    return clean;
  };

  const handleOpenFullTab = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!resumeUrl) return;

    if (blobUrl) {
      window.open(blobUrl, '_blank');
      return;
    }

    if (resumeUrl.startsWith('data:')) {
      const blob = dataUrlToBlob(resumeUrl);
      if (blob) {
        const u = URL.createObjectURL(blob);
        window.open(u, '_blank');
        return;
      }
    }

    window.open(resumeUrl, '_blank');
  };

  const handleDownload = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!resumeUrl) return;

    setIsDownloading(true);
    const fileName = `Resume_${(heroName || 'Abdul_Sami').replace(/\s+/g, '_')}.pdf`;

    try {
      if (resumeUrl.startsWith('data:') || resumeUrl.startsWith('blob:')) {
        const a = document.createElement('a');
        a.href = resumeUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsDownloading(false);
        return;
      }

      const res = await fetch(resumeUrl, { mode: 'cors' });
      if (!res.ok) throw new Error('Fetch failed');
      const blob = await res.blob();
      const bUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = bUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(bUrl);
    } catch (err) {
      const a = document.createElement('a');
      a.href = resumeUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    blobUrl,
    isDownloading,
    getDocumentName,
    handleOpenFullTab,
    handleDownload,
    dataUrlToBlob
  };
}
