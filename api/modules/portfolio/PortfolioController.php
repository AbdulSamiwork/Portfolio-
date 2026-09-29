<?php
require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../../core/Response.php';

class PortfolioController {
    public static function getPortfolio() {
        $db = Database::getInstance();

        if (!$db) {
            Response::json([
                "status" => "offline_mode",
                "data" => null
            ]);
        }

        try {
            // Fetch Hero
            $heroStmt = $db->query("SELECT * FROM portfolio_hero WHERE id = 1");
            $heroRow = $heroStmt->fetch();

            $hero = [
                "name" => $heroRow['name'] ?? "Abdul Sami",
                "titleTag" => $heroRow['title_tag'] ?? "Full-Stack & AI Practitioner",
                "headline" => $heroRow['headline'] ?? "Building Scalable Web Apps & Intelligent AI Systems",
                "bio" => $heroRow['bio'] ?? "",
                "profileImage" => $heroRow['profile_image'] ?? "/images/abdul_sami_profile.webp",
                "metric1" => ["value" => $heroRow['metric1_value'] ?? "92%", "label" => $heroRow['metric1_label'] ?? "ML Model Accuracy"],
                "metric2" => ["value" => $heroRow['metric2_value'] ?? "10+", "label" => $heroRow['metric2_label'] ?? "AI/DS Tasks Solved"],
                "metric3" => ["value" => $heroRow['metric3_value'] ?? "MERN + PHP", "label" => $heroRow['metric3_label'] ?? "Full-Stack Core"],
                "githubUrl" => $heroRow['github_url'] ?? "https://github.com/Abdul-Sami1122",
                "linkedinUrl" => $heroRow['linkedin_url'] ?? "https://linkedin.com/in/abdul-sami",
                "email" => $heroRow['email'] ?? "sb850839@gmail.com",
                "phone" => $heroRow['phone'] ?? "+92-3228483029",
                "location" => $heroRow['location'] ?? "Pakistan (Available Worldwide Remote)",
                "resumeUrl" => !empty($heroRow['resume_url']) ? $heroRow['resume_url'] : "/resume_abdul_sami.pdf"
            ];

            // Fetch About
            $aboutStmt = $db->query("SELECT * FROM portfolio_about WHERE id = 1");
            $aboutRow = $aboutStmt->fetch();

            $about = [
                "sectionTitle" => $aboutRow['section_title'] ?? "",
                "sectionSubtitle" => $aboutRow['section_subtitle'] ?? "",
                "cardHeading" => $aboutRow['card_heading'] ?? "",
                "paragraph1" => $aboutRow['paragraph1'] ?? "",
                "paragraph2" => $aboutRow['paragraph2'] ?? "",
                "paragraph3" => $aboutRow['paragraph3'] ?? ""
            ];

            // Fetch Skills
            $skillsStmt = $db->query("SELECT id, category, name, level, description as `desc` FROM portfolio_skills");
            $skills = $skillsStmt->fetchAll();

            // Fetch Experiences
            $expStmt = $db->query("SELECT id, role, company, period, domain, category, achievements_json, skills_json FROM portfolio_experiences");
            $expRows = $expStmt->fetchAll();
            $experiences = array_map(function($e) {
                $e['achievements'] = json_decode($e['achievements_json'] ?? '[]');
                $e['skills'] = json_decode($e['skills_json'] ?? '[]');
                unset($e['achievements_json'], $e['skills_json']);
                return $e;
            }, $expRows);

            // Fetch Projects
            $projStmt = $db->query("SELECT id, title, subtitle, category, category_badge as categoryBadge, image, tech_json, summary, highlights_json, github_url as github FROM portfolio_projects");
            $projRows = $projStmt->fetchAll();
            $projects = array_map(function($p) {
                $p['tech'] = json_decode($p['tech_json'] ?? '[]');
                $p['highlights'] = json_decode($p['highlights_json'] ?? '[]');
                unset($p['tech_json'], $p['highlights_json']);
                return $p;
            }, $projRows);

            // Fetch Certifications
            $certStmt = $db->query("SELECT id, type, title, institution, period, badge, category, description as `desc` FROM portfolio_certifications");
            $certifications = $certStmt->fetchAll();

            // Fetch Testimonials (with graceful fallback if table not migrated yet)
            $testimonials = [];
            try {
                $testiStmt = $db->query("SELECT id, name, role, company, avatar, rating, content, content as quote, date, verified FROM portfolio_testimonials");
                if ($testiStmt) {
                    $testimonials = $testiStmt->fetchAll();
                }
            } catch (Exception $ex) {
                $testimonials = [];
            }

            Response::success([
                "hero" => $hero,
                "resumeUrl" => $hero['resumeUrl'],
                "about" => $about,
                "skills" => $skills,
                "experiences" => $experiences,
                "projects" => $projects,
                "education" => $certifications,
                "testimonials" => $testimonials
            ]);

        } catch (PDOException $e) {
            Response::error($e->getMessage(), 500);
        }
    }
}
