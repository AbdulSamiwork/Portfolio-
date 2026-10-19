<?php
/**
 * Dynamic Open Graph & Social Share Gateway for Abdul Sami Portfolio
 * Generates dynamic Open Graph (OG) and Twitter Card tags for social media crawlers
 * (WhatsApp, Twitter/X, Facebook, LinkedIn, Telegram, Discord).
 * Automatically redirects real users to the React SPA with the target project modal open.
 */

// Base site configuration
$siteDomain = "https://abdulsami.tech";
$defaultTitle = "Abdul Sami | Full-Stack Web Developer & Machine Learning Specialist";
$defaultDesc = "Portfolio of Abdul Sami — Full-Stack Web Developer (MERN, PHP) and Machine Learning & Deep Learning Specialist (Python, Azure AI, Scikit-Learn).";
$defaultImage = $siteDomain . "/images/og-preview.png";

// Static fallback projects
$fallbackProjects = [
    'proj-1' => [
        'id' => 'proj-1',
        'title' => 'Gristmill Management System | Abdul Sami',
        'subtitle' => 'Decoupled Enterprise Management System',
        'description' => 'Designed and executed a web-based enterprise management system utilizing a decoupled React frontend and Core PHP backend architecture.',
        'image' => $siteDomain . '/images/project_gristmill.png',
        'category' => 'Full-Stack Web App'
    ],
    'proj-2' => [
        'id' => 'proj-2',
        'title' => 'Underpure E-Commerce Platform | Abdul Sami',
        'subtitle' => 'Apparel E-Commerce Web Application',
        'description' => 'Developed a modern web application for apparel with a responsive React frontend and Core PHP / MySQL backend API integrations.',
        'image' => $siteDomain . '/images/project_underpure.png',
        'category' => 'Full-Stack E-Commerce'
    ],
    'proj-3' => [
        'id' => 'proj-3',
        'title' => 'Heart Attack Prediction System | Abdul Sami',
        'subtitle' => '92% Accurate Diagnostic Neural Network',
        'description' => 'Clinical diagnostic neural network trained on cardiac health datasets achieving 92% diagnostic accuracy with Scikit-Learn and Azure AI.',
        'image' => $siteDomain . '/images/project_heart_attack.png',
        'category' => 'AI & Deep Learning'
    ],
    'proj-4' => [
        'id' => 'proj-4',
        'title' => 'Height Prediction ML Engine | Abdul Sami',
        'subtitle' => 'Biometric Regression Machine Learning Pipeline',
        'description' => 'Supervised Machine Learning biometric regression model built in Python utilizing Scikit-Learn, NumPy, and Pandas.',
        'image' => $siteDomain . '/images/project_height_prediction.png',
        'category' => 'Machine Learning System'
    ]
];

// Determine requested project ID
$projectId = isset($_GET['id']) ? trim($_GET['id']) : (isset($_GET['project']) ? trim($_GET['project']) : '');

$project = null;

// Try to load project from MySQL if available
if (!empty($projectId) && file_exists(__DIR__ . '/api/config/Database.php')) {
    try {
        require_once __DIR__ . '/api/config/Database.php';
        $db = new Database();
        $conn = $db->getConnection();
        if ($conn) {
            $stmt = $conn->prepare("SELECT * FROM projects WHERE id = :id OR LOWER(REPLACE(title, ' ', '-')) = :slug LIMIT 1");
            $stmt->execute([':id' => $projectId, ':slug' => strtolower($projectId)]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $img = $row['image'] ?? '';
                if (!empty($img) && !preg_match('~^https?://~i', $img)) {
                    $img = $siteDomain . '/' . ltrim($img, '/');
                }
                $project = [
                    'id' => $row['id'],
                    'title' => $row['title'] . ' | Abdul Sami',
                    'subtitle' => $row['subtitle'] ?? '',
                    'description' => $row['summary'] ?? $row['description'] ?? $defaultDesc,
                    'image' => !empty($img) ? $img : $defaultImage,
                    'category' => $row['category_badge'] ?? $row['category'] ?? 'Engineering Project'
                ];
            }
        }
    } catch (Exception $e) {
        // Fallback to static list
    }
}

// Fallback to static dictionary if not found in database
if (!$project && !empty($projectId)) {
    if (isset($fallbackProjects[$projectId])) {
        $project = $fallbackProjects[$projectId];
    } else {
        foreach ($fallbackProjects as $k => $fp) {
            if (stripos($fp['title'], $projectId) !== false || stripos($k, $projectId) !== false) {
                $project = $fp;
                break;
            }
        }
    }
}

// Final metadata assignments
$metaTitle = $project ? htmlspecialchars($project['title']) : htmlspecialchars($defaultTitle);
$metaDesc = $project ? htmlspecialchars($project['description']) : htmlspecialchars($defaultDesc);
$metaImage = $project ? htmlspecialchars($project['image']) : htmlspecialchars($defaultImage);
$targetUrl = !empty($projectId) 
    ? $siteDomain . "/?project=" . urlencode($projectId) 
    : $siteDomain . "/";

// Detect if visitor is a social bot crawler
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$isCrawler = (bool)preg_match('/(facebookexternalhit|WhatsApp|Twitterbot|LinkedInBot|TelegramBot|Discordbot|SkypeUriPreview|Googlebot|bingbot|Baiduspider|YandexBot|Applebot|DuckDuckBot)/i', $userAgent);

// If real human visitor and redirect requested, instantly redirect to React SPA
if (!$isCrawler && !isset($_GET['preview'])) {
    header("Location: " . $targetUrl, true, 302);
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $metaTitle ?></title>
    <meta name="description" content="<?= $metaDesc ?>">
    <link rel="canonical" href="<?= htmlspecialchars($targetUrl) ?>">

    <!-- Open Graph / Facebook / WhatsApp / LinkedIn -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= htmlspecialchars($targetUrl) ?>">
    <meta property="og:title" content="<?= $metaTitle ?>">
    <meta property="og:description" content="<?= $metaDesc ?>">
    <meta property="og:image" content="<?= $metaImage ?>">
    <meta property="og:image:secure_url" content="<?= $metaImage ?>">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="<?= $metaTitle ?>">
    <meta property="og:site_name" content="Abdul Sami Portfolio">
    <meta property="og:locale" content="en_US">

    <!-- Twitter / X Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="<?= htmlspecialchars($targetUrl) ?>">
    <meta name="twitter:title" content="<?= $metaTitle ?>">
    <meta name="twitter:description" content="<?= $metaDesc ?>">
    <meta name="twitter:image" content="<?= $metaImage ?>">
    <meta name="twitter:image:alt" content="<?= $metaTitle ?>">
    <meta name="twitter:creator" content="@AbdulSami">

    <style>
        body {
            background-color: #06080e;
            color: #f1f5f9;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
        }
        .card {
            max-width: 540px;
            width: 100%;
            background: #0d121f;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .thumb {
            width: 100%;
            height: 240px;
            object-fit: cover;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 20px;
        }
        h1 {
            font-size: 20px;
            margin: 0 0 10px;
            color: #ffffff;
        }
        p {
            font-size: 14px;
            color: #94a3b8;
            line-height: 1.5;
            margin: 0 0 20px;
        }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
            color: #06080e;
            font-weight: 700;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-size: 14px;
            transition: opacity 0.2s;
        }
        .btn:hover {
            opacity: 0.9;
        }
    </style>
    <script>
        // Automatic client redirection for humans
        setTimeout(function() {
            window.location.replace("<?= $targetUrl ?>");
        }, 150);
    </script>
</head>
<body>
    <div class="card">
        <img src="<?= $metaImage ?>" alt="<?= $metaTitle ?>" class="thumb">
        <h1><?= $metaTitle ?></h1>
        <p><?= $metaDesc ?></p>
        <a href="<?= htmlspecialchars($targetUrl) ?>" class="btn">View Project in Portfolio &rarr;</a>
    </div>
</body>
</html>
