<?php
require_once __DIR__ . '/../core/Cors.php';
require_once __DIR__ . '/../modules/portfolio/PortfolioController.php';

header("Cache-Control: public, max-age=180, stale-while-revalidate=86400");
PortfolioController::getPortfolio();
