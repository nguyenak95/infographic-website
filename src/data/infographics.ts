import type { Infographic } from './types';

export const INFOGRAPHICS: Infographic[] = [
  {
    "prompt": "Create a step-by-step treatment protocol for Type 2 Diabetes covering diagnosis, lifestyle changes, medication stages (metformin first-line, insulin escalation), and monitoring milestones. Use a vertical flowchart structure with 5 main stages.",
    "image_path": "/infographics/hc_001_treatment_protocol.png",
    "metadata": {
      "id": "HC-001",
      "title": "Treatment Protocol Flowchart",
      "domain": "healthcare",
      "tags": "healthcare;process-flow;medical-protocol;decision-tree;clinical",
      "signals": "treatment protocol;therapy;stages;protocol;clinical pathway",
      "complexity": "Medium",
      "dataType": "Process/Sequential",
      "inputPattern": "Create an infographic of the treatment protocol for [disease] with [N] stages: [stage 1], [stage 2], ...",
      "visualStyle": {
        "aspectRatio": "16:9",
        "layout_template": {
          "grid_structure": "A 3-column main grid for the three stages (Blood Sugar Control, Medication Adjustment, Complication Monitoring), with flexible rows within each column to accommodate decision diamonds and action steps. A dedicated top row for the title and introduction, and a bottom row for legend and disclaimers.",
          "spatial_mapping": {
            "top": "Infographic title and a brief introductory statement about the protocol's purpose.",
            "center": "The core flowchart, horizontally structured across the three stages. Each stage will have a clear entry point, a series of decision diamonds, and corresponding action rectangles. Pathways will branch and converge, with distinct color coding.",
            "bottom": "A comprehensive legend explaining color codes for patient profiles/pathways, medication icons, and any other symbols used. Includes sources or disclaimers."
          }
        },
        "style_framework": {
          "palette": {
            "primary_colors": "Professional blues (e.g., #007BFF, #0056B3) for main pathways and headings, calming greens (e.g., #28A745, #218838) for positive outcomes or stable states.",
            "accent_colors": "Warm yellows/oranges (e.g., #FFC107, #E0A800) for decision diamonds and critical alerts, soft greys (e.g., #6C757D, #F8F9FA) for less common or alternative paths. Distinct, slightly varied shades of primary/accent colors for different patient profiles.",
            "background": "Clean, light off-white or very light grey (#F8F9FA or #F2F2F2) to ensure high readability and a professional feel."
          },
          "typography": {
            "headings": "Clear, modern sans-serif (e.g., Montserrat Bold, Open Sans Semibold) for titles and stage headers, ensuring strong hierarchy.",
            "body": "Highly legible sans-serif (e.g., Lato Regular, Roboto Regular) for all process steps, decision questions, and legend text. Consistent font sizes for readability at a glance."
          },
          "surface_treatments": {
            "shapes": "Standard flowchart shapes: Rectangles with slightly rounded corners for process steps, sharp diamonds for decision points, ovals for start/end (if applicable). Medication icons will be simple, recognizable glyphs. Arrows will be clean and directional.",
            "depth_and_borders": "Subtle drop shadows on key elements (decision diamonds, stage containers) to create a sense of hierarchy and depth. Clean, thin borders around all shapes, with border color changing to match pathway colors."
          },
          "components": [
            "Stage Header Banners",
            "Decision Diamonds (Yes/No, Multiple Choice)",
            "Process Rectangles",
            "Action Callouts",
            "Directional Arrows (color-coded)",
            "Medication Icons (e.g., pill, syringe, insulin pen)",
            "Patient Profile Indicators (small color swatches or icons)",
            "Legend Box"
          ],
          "tone": "Professional, clear, informative, structured, and reassuring. Emphasizes clarity and ease of navigation for complex medical information."
        },
        "notes": "The visual design prioritizes clarity and quick comprehension. Color coding for pathways and distinct iconography are crucial for differentiating patient profiles and treatment options. The layout should guide the eye smoothly through the protocol stages."
      },
      "contentSummary": "Create an infographic of the treatment protocol for type 2 diabetes with 3 stages: blood sugar control, medication adjustment, complication monitoring",
      "templateSeed": {
        "styleSummary": "A professional, clean flowchart design featuring distinct decision diamonds, color-coded pathways to represent different patient profiles or treatment responses, and clear medication icons. The overall aesthetic is structured and easy to follow, suitable for a healthcare context.",
        "layoutPattern": "The infographic follows a left-to-right, linear progression across three main stages: 'Blood Sugar Control', 'Medication Adjustment', and 'Complication Monitoring'. Each stage begins with an entry point, proceeds through one or more decision diamonds (e.g., 'Is HbA1c target met?'), leading to various action steps (e.g., 'Initiate Metformin', 'Add SGLT2i'). Pathways will branch based on decisions and converge when appropriate. Different patient profiles (e.g., with comorbidities, without comorbidities) will be represented by distinct colored pathways throughout the flowchart.",
        "reusableElements": [
          "Stage Title Banners (e.g., 'Stage 1: Blood Sugar Control')",
          "Decision Diamond (e.g., 'HbA1c > 7%?')",
          "Process Step Rectangle (e.g., 'Lifestyle Modifications')",
          "Action Step Rectangle (e.g., 'Prescribe Metformin')",
          "Medication Icon Set (e.g., for Metformin, Insulin, GLP-1 RA, SGLT2i)",
          "Color-coded Directional Arrows (for different patient profiles)",
          "Patient Profile Legend Entries",
          "Outcome/Monitoring Callout (e.g., 'Monitor Renal Function')"
        ],
        "abstract": [
          "A structured clinical decision-making tool for Type 2 Diabetes treatment.",
          "A visual guide for healthcare professionals to navigate patient management protocols.",
          "An educational resource illustrating the multi-stage approach to diabetes care."
        ],
        "notes": "The effectiveness of this template relies heavily on intuitive color coding for pathways and universally recognizable icons for medications. The decision diamonds must be clearly worded to avoid ambiguity. The flow should be logical and minimize visual clutter despite the potential for multiple branches."
      }
    }
  },
  {
    "prompt": "Create infographic for Drug Development Timeline",
    "image_path": "/infographics/hc-002_drug_development_timeline.png",
    "metadata": {
      "id": "HC-002",
      "title": "Drug Development Timeline",
      "domain": "healthcare",
      "complexity": "Medium",
      "dataType": "Sequential/Time-based",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Disease Progression Stages",
    "image_path": "/infographics/hc-003_disease_progression_stages.png",
    "metadata": {
      "id": "HC-003",
      "title": "Disease Progression Stages",
      "domain": "healthcare",
      "complexity": "Medium",
      "dataType": "Categorical/Progressive",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Symptom Pattern Network",
    "image_path": "/infographics/hc-004_symptom_pattern_network.png",
    "metadata": {
      "id": "HC-004",
      "title": "Symptom Pattern Network",
      "domain": "healthcare",
      "complexity": "High",
      "dataType": "Relationship/Network",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Prevention Campaign Checklist",
    "image_path": "/infographics/hc-005_prevention_campaign_checklist.png",
    "metadata": {
      "id": "HC-005",
      "title": "Prevention Campaign Checklist",
      "domain": "healthcare",
      "complexity": "Low",
      "dataType": "List/Actionable",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Learning Pathway Process",
    "image_path": "/infographics/ed-001_learning_pathway_process.png",
    "metadata": {
      "id": "ED-001",
      "title": "Learning Pathway Process",
      "domain": "education",
      "complexity": "Medium",
      "dataType": "Sequential/Skill-building",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Learning Methods Comparison",
    "image_path": "/infographics/ed-002_learning_methods_comparison.png",
    "metadata": {
      "id": "ED-002",
      "title": "Learning Methods Comparison",
      "domain": "education",
      "complexity": "Medium",
      "dataType": "Comparative/Multi-dimensional",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Exam Preparation Checklist",
    "image_path": "/infographics/ed-003_exam_preparation_checklist.png",
    "metadata": {
      "id": "ED-003",
      "title": "Exam Preparation Checklist",
      "domain": "education",
      "complexity": "Low",
      "dataType": "Task-based/Sequential",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Class Performance Dashboard",
    "image_path": "/infographics/ed-004_class_performance_dashboard.png",
    "metadata": {
      "id": "ED-004",
      "title": "Class Performance Dashboard",
      "domain": "education",
      "complexity": "High",
      "dataType": "Statistical/Analytical",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Historical Timeline",
    "image_path": "/infographics/ed-005_historical_timeline.png",
    "metadata": {
      "id": "ED-005",
      "title": "Historical Timeline",
      "domain": "education",
      "complexity": "Medium",
      "dataType": "Chronological/Narrative",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Concept Map Overview",
    "image_path": "/infographics/ed-006_concept_map_overview.png",
    "metadata": {
      "id": "ED-006",
      "title": "Concept Map Overview",
      "domain": "education",
      "complexity": "Medium",
      "dataType": "Concept/Network",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Debug / Dev Workflow Steps",
    "image_path": "/infographics/ed-007_debug_dev_workflow_steps.png",
    "metadata": {
      "id": "ED-007",
      "title": "Debug / Dev Workflow Steps",
      "domain": "education",
      "complexity": "Medium",
      "dataType": "Step-by-step/Procedure",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Coding Assignment / Report Structure",
    "image_path": "/infographics/ed-008_coding_assignment_report_structure.png",
    "metadata": {
      "id": "ED-008",
      "title": "Coding Assignment / Report Structure",
      "domain": "education",
      "complexity": "Low-Medium",
      "dataType": "Structural/Template",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Programming Course Syllabus Overview",
    "image_path": "/infographics/ed-009_programming_course_syllabus_overview.png",
    "metadata": {
      "id": "ED-009",
      "title": "Programming Course Syllabus Overview",
      "domain": "education",
      "complexity": "Medium",
      "dataType": "Overview/Module-map",
      "visualStyle": {
        "aspectRatio": "4:3"
      }
    }
  },
  {
    "prompt": "Create infographic for CS Study Habits Checklist",
    "image_path": "/infographics/ed-010_cs_study_habits_checklist.png",
    "metadata": {
      "id": "ED-010",
      "title": "CS Study Habits Checklist",
      "domain": "education",
      "complexity": "Low",
      "dataType": "List/Actionable",
      "visualStyle": {
        "aspectRatio": "4:3"
      }
    }
  },

  {
    "prompt": "Create infographic for Programming Course Learning Analytics Dashboard",
    "image_path": "/infographics/ed-012_programming_course_learning_analytics_dashboard.png",
    "metadata": {
      "id": "ED-012",
      "title": "Programming Course Learning Analytics Dashboard",
      "domain": "education",
      "complexity": "High",
      "dataType": "Metrics/Dashboard",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Developer Student Portfolio Snapshot",
    "image_path": "/infographics/ed-013_developer_student_portfolio_snapshot.png",
    "metadata": {
      "id": "ED-013",
      "title": "Developer Student Portfolio Snapshot",
      "domain": "education",
      "complexity": "Medium",
      "dataType": "Profile/Highlight",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Coding Program Outcome Statistics",
    "image_path": "/infographics/ed-014_coding_program_outcome_statistics.png",
    "metadata": {
      "id": "ED-014",
      "title": "Coding Program Outcome Statistics",
      "domain": "education",
      "complexity": "Medium",
      "dataType": "Descriptive/Stats-summary",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Programming Learning Resource Map",
    "image_path": "/infographics/ed-015_programming_learning_resource_map.png",
    "metadata": {
      "id": "ED-015",
      "title": "Programming Learning Resource Map",
      "domain": "education",
      "complexity": "Medium",
      "dataType": "Resource/Recommendation-map",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Visual Lesson Plan Overview",
    "image_path": "/infographics/ed-016_visual_lesson_plan_overview.png",
    "metadata": {
      "id": "ED-016",
      "title": "Visual Lesson Plan Overview",
      "domain": "education",
      "complexity": "Medium",
      "dataType": "Overview/Timeline",
      "visualStyle": {
        "aspectRatio": "9:16"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom A Vibrant",
    "image_path": "/infographics/ed-017_custom_a_vibrant.png",
    "metadata": {
      "id": "ED-017",
      "title": "Custom A Vibrant",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "3:4"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Infographic Divided Into Tip Blocks With Tech Icons",
    "image_path": "/infographics/ed-018_custom_infographic_divided_into_tip_blocks_with_tech_icons.png",
    "metadata": {
      "id": "ED-018",
      "title": "Custom Infographic Divided Into Tip Blocks With Tech Icons",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Central Node 'Visual Learning' With 8 Strategy Branches",
    "image_path": "/infographics/ed-019_custom_central_node_visual_learning_with_8_strategy_branches.png",
    "metadata": {
      "id": "ED-019",
      "title": "Custom Central Node 'Visual Learning' With 8 Strategy Branches",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Menu Layout",
    "image_path": "/infographics/ed-020_custom_menu_layout.png",
    "metadata": {
      "id": "ED-020",
      "title": "Custom Menu Layout",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "3:4"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Review Page Divided Into Clear Zones: Concepts",
    "image_path": "/infographics/ed-021_custom_review_page_divided_into_clear_zones_concepts.png",
    "metadata": {
      "id": "ED-021",
      "title": "Custom Review Page Divided Into Clear Zones: Concepts",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Light Swimlane Diagram Where Each Role Gets A Row",
    "image_path": "/infographics/ed-022_custom_light_swimlane_diagram_where_each_role_gets_a_row.png",
    "metadata": {
      "id": "ED-022",
      "title": "Custom Light Swimlane Diagram Where Each Role Gets A Row",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Wheel Diagram Divided Into Segments",
    "image_path": "/infographics/ed-023_custom_wheel_diagram_divided_into_segments.png",
    "metadata": {
      "id": "ED-023",
      "title": "Custom Wheel Diagram Divided Into Segments",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "1:1"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Board Game Style Layout Showing Levels",
    "image_path": "/infographics/ed-024_custom_board_game_style_layout_showing_levels.png",
    "metadata": {
      "id": "ED-024",
      "title": "Custom Board Game Style Layout Showing Levels",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Parent-Friendly Flyer Utilizing Clearly Defined Blocks For Objectives",
    "image_path": "/infographics/ed-025_custom_parentfriendly_flyer_utilizing_clearly_defined_blocks_for_objectives.png",
    "metadata": {
      "id": "ED-025",
      "title": "Custom Parent-Friendly Flyer Utilizing Clearly Defined Blocks For Objectives",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "4:3"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Scientific Poster Layout Featuring A Large Title Block",
    "image_path": "/infographics/ed-026_custom_scientific_poster_layout_featuring_a_large_.png",
    "metadata": {
      "id": "ED-026",
      "title": "Custom Scientific Poster Layout Featuring A Large Title Block",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "4:3"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Grid Calendar Categorized By Week And Day",
    "image_path": "/infographics/ed-027_custom_grid_calendar_categorized_by_week_and_day.png",
    "metadata": {
      "id": "ED-027",
      "title": "Custom Grid Calendar Categorized By Week And Day",
      "domain": "General / Multipurpose",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Campaign Launch Timeline",
    "image_path": "/infographics/mk-001_campaign_launch_timeline.png",
    "metadata": {
      "id": "MK-001",
      "title": "Campaign Launch Timeline",
      "domain": "marketing",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Vertical Funnel Diagram With Clear Stage Labels",
    "image_path": "/infographics/mk-002_custom_vertical_funnel_diagram_with_clear_stage_la.png",
    "metadata": {
      "id": "MK-002",
      "title": "Custom Vertical Funnel Diagram With Clear Stage Labels",
      "domain": "marketing",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "3:4"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Channel Comparison Matrix Evaluating Platforms On Cost",
    "image_path": "/infographics/mk-003_custom_channel_comparison_matrix_evaluating_platfo.png",
    "metadata": {
      "id": "MK-003",
      "title": "Custom Channel Comparison Matrix Evaluating Platforms On Cost",
      "domain": "marketing",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom A Comprehensive Checklist Separated Into Logical Phases With Distinct Quality Indicators And Best Practice Badges.",
    "image_path": "/infographics/mk-004_custom_a_comprehensive_checklist_separated_into_lo.png",
    "metadata": {
      "id": "MK-004",
      "title": "Custom A Comprehensive Checklist Separated Into Logical Phases With Distinct Quality Indicators And Best Practice Badges.",
      "domain": "marketing",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "3:4"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom A Customer Journey Map Tracing 5 Touchpoints With Attached Conversion Metrics And Visual Pain Indicators.",
    "image_path": "/infographics/mk-005_custom_a_customer_journey_map_tracing_5_touchpoint.png",
    "metadata": {
      "id": "MK-005",
      "title": "Custom A Customer Journey Map Tracing 5 Touchpoints With Attached Conversion Metrics And Visual Pain Indicators.",
      "domain": "marketing",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Persona Card Infographic Combining A Relatable Avatar With Segmented Demographic And Behavioral Data.",
    "image_path": "/infographics/mk-006_custom_persona_card_infographic_combining_a_relata.png",
    "metadata": {
      "id": "MK-006",
      "title": "Custom Persona Card Infographic Combining A Relatable Avatar With Segmented Demographic And Behavioral Data.",
      "domain": "marketing",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "3:4"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Social Media Content Calendar Formatted As A Table/Timeline",
    "image_path": "/infographics/mk-007_custom_social_media_content_calendar_formatted_as_.png",
    "metadata": {
      "id": "MK-007",
      "title": "Custom Social Media Content Calendar Formatted As A Table/Timeline",
      "domain": "marketing",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Financial Dashboard Featuring High-Level Kpi Cards",
    "image_path": "/infographics/bs-002_custom_financial_dashboard_featuring_highlevel_kpi.png",
    "metadata": {
      "id": "BS-002",
      "title": "Custom Financial Dashboard Featuring High-Level Kpi Cards",
      "domain": "business",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Gantt-Style Project Timeline Displaying Task Durations",
    "image_path": "/infographics/bs-003_custom_ganttstyle_project_timeline_displaying_task.png",
    "metadata": {
      "id": "BS-003",
      "title": "Custom Gantt-Style Project Timeline Displaying Task Durations",
      "domain": "business",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Swimlane Process Flow Mapping The Order Approval Process Across 5 Different Departments.",
    "image_path": "/infographics/bs-005_custom_swimlane_process_flow_mapping_the_order_app.png",
    "metadata": {
      "id": "BS-005",
      "title": "Custom Swimlane Process Flow Mapping The Order Approval Process Across 5 Different Departments.",
      "domain": "business",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Architecture Diagram Utilizing Distinct Service Boxes",
    "image_path": "/infographics/tech-001_custom_architecture_diagram_utilizing_distinct_ser.png",
    "metadata": {
      "id": "TECH-001b",
      "title": "Custom Architecture Diagram Utilizing Distinct Service Boxes",
      "domain": "technology",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Linear Pipeline Flowchart Depicting Ci/Cd Stages From Code Commit To Production Deployment",
    "image_path": "/infographics/tech-002_custom_linear_pipeline_flowchart_depicting_cicd_st.png",
    "metadata": {
      "id": "TECH-002",
      "title": "Custom Linear Pipeline Flowchart Depicting Ci/Cd Stages From Code Commit To Production Deployment",
      "domain": "technology",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Tech Stack Comparison",
    "image_path": "/infographics/tech-003_tech_stack_comparison.png",
    "metadata": {
      "id": "TECH-003",
      "title": "Tech Stack Comparison",
      "domain": "technology",
      "complexity": "Medium",
      "dataType": "Comparative/Feature-based",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Security Checklist",
    "image_path": "/infographics/tech-004_security_checklist.png",
    "metadata": {
      "id": "TECH-004",
      "title": "Security Checklist",
      "domain": "technology",
      "complexity": "Medium",
      "dataType": "Security/Criteria-based",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Performance Metrics Dashboard",
    "image_path": "/infographics/tech-005_performance_metrics_dashboard.png",
    "metadata": {
      "id": "TECH-005",
      "title": "Performance Metrics Dashboard",
      "domain": "technology",
      "complexity": "High",
      "dataType": "Real-time/Metrics",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom A Calming",
    "image_path": "/infographics/hc-007_custom_a_calming.png",
    "metadata": {
      "id": "HC-007",
      "title": "Custom A Calming",
      "domain": "healthcare",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "3:4"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom A Standard 4-Quadrant Swot Matrix Featuring Large Icons",
    "image_path": "/infographics/bs-001_custom_a_standard_4quadrant_swot_matrix_featuring_.png",
    "metadata": {
      "id": "BS-001",
      "title": "Custom A Standard 4-Quadrant Swot Matrix Featuring Large Icons",
      "domain": "business",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for System Architecture Diagram",
    "image_path": "/infographics/tech-001_system_architecture_diagram.png",
    "metadata": {
      "id": "TECH-001",
      "title": "System Architecture Diagram",
      "domain": "technology",
      "complexity": "High",
      "dataType": "Structural/Technical",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Custom Comparison Matrix Utilizing Macro Nutritional Breakdowns",
    "image_path": "/infographics/hc-006_custom_comparison_matrix_utilizing_macro_nutrition.png",
    "metadata": {
      "id": "HC-006",
      "title": "Custom Comparison Matrix Utilizing Macro Nutritional Breakdowns",
      "domain": "healthcare",
      "complexity": "Medium",
      "dataType": "Custom",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Mental Health Awareness Checklist",
    "image_path": "/infographics/hc-007b_mental_health_awareness_checklist.png",
    "metadata": {
      "id": "HC-007b",
      "title": "Mental Health Awareness Checklist",
      "domain": "healthcare",
      "complexity": "Low",
      "dataType": "List/Actionable",
      "visualStyle": {
        "aspectRatio": "3:4"
      }
    }
  },
  {
    "prompt": "Create infographic for Vaccination Schedule Timeline",
    "image_path": "/infographics/hc-008_vaccination_schedule_timeline.png",
    "metadata": {
      "id": "HC-008",
      "title": "Vaccination Schedule Timeline",
      "domain": "healthcare",
      "complexity": "Medium",
      "dataType": "Sequential/Time-based",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Hospital Department Network Map",
    "image_path": "/infographics/hc-009_hospital_department_network_map.png",
    "metadata": {
      "id": "HC-009",
      "title": "Hospital Department Network Map",
      "domain": "healthcare",
      "complexity": "High",
      "dataType": "Relationship/Network",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Health Metrics Dashboard",
    "image_path": "/infographics/hc-010_health_metrics_dashboard.png",
    "metadata": {
      "id": "HC-010",
      "title": "Health Metrics Dashboard",
      "domain": "healthcare",
      "complexity": "High",
      "dataType": "Metrics/Dashboard",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Brand Identity Overview",
    "image_path": "/infographics/mk-008_brand_identity_overview.png",
    "metadata": {
      "id": "MK-008",
      "title": "Brand Identity Overview",
      "domain": "marketing",
      "complexity": "Medium",
      "dataType": "Overview/Profile",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Email Marketing Workflow",
    "image_path": "/infographics/mk-009_email_marketing_workflow.png",
    "metadata": {
      "id": "MK-009",
      "title": "Email Marketing Workflow",
      "domain": "marketing",
      "complexity": "Medium",
      "dataType": "Process/Sequential",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Market Segmentation Map",
    "image_path": "/infographics/mk-010_market_segmentation_map.png",
    "metadata": {
      "id": "MK-010",
      "title": "Market Segmentation Map",
      "domain": "marketing",
      "complexity": "Medium",
      "dataType": "Concept/Network",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Startup Pitch Deck Summary",
    "image_path": "/infographics/bs-006_startup_pitch_deck_summary.png",
    "metadata": {
      "id": "BS-006",
      "title": "Startup Pitch Deck Summary",
      "domain": "business",
      "complexity": "Medium",
      "dataType": "Overview/Profile",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Supply Chain Process Flow",
    "image_path": "/infographics/bs-007_supply_chain_process_flow.png",
    "metadata": {
      "id": "BS-007",
      "title": "Supply Chain Process Flow",
      "domain": "business",
      "complexity": "High",
      "dataType": "Process/Multi-stakeholder",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Revenue Model Comparison",
    "image_path": "/infographics/bs-008_revenue_model_comparison.png",
    "metadata": {
      "id": "BS-008",
      "title": "Revenue Model Comparison",
      "domain": "business",
      "complexity": "Medium",
      "dataType": "Comparative/Feature-based",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for OKR Tracking Dashboard",
    "image_path": "/infographics/bs-009_okr_tracking_dashboard.png",
    "metadata": {
      "id": "BS-009",
      "title": "OKR Tracking Dashboard",
      "domain": "business",
      "complexity": "Medium",
      "dataType": "Metrics/Dashboard",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Risk Assessment Matrix",
    "image_path": "/infographics/bs-010_risk_assessment_matrix.png",
    "metadata": {
      "id": "BS-010",
      "title": "Risk Assessment Matrix",
      "domain": "business",
      "complexity": "Medium",
      "dataType": "Analytical/Matrix",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for API Integration Network",
    "image_path": "/infographics/tech-006_api_integration_network.png",
    "metadata": {
      "id": "TECH-006",
      "title": "API Integration Network",
      "domain": "technology",
      "complexity": "High",
      "dataType": "Relationship/Network",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Cloud Migration Timeline",
    "image_path": "/infographics/tech-007_cloud_migration_timeline.png",
    "metadata": {
      "id": "TECH-007",
      "title": "Cloud Migration Timeline",
      "domain": "technology",
      "complexity": "High",
      "dataType": "Sequential/Time-based",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Database Schema Overview",
    "image_path": "/infographics/tech-008_database_schema_overview.png",
    "metadata": {
      "id": "TECH-008",
      "title": "Database Schema Overview",
      "domain": "technology",
      "complexity": "Medium",
      "dataType": "Structural/Technical",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for DevOps Toolchain Comparison",
    "image_path": "/infographics/tech-009_devops_toolchain_comparison.png",
    "metadata": {
      "id": "TECH-009",
      "title": "DevOps Toolchain Comparison",
      "domain": "technology",
      "complexity": "Medium",
      "dataType": "Comparative/Feature-based",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  },
  {
    "prompt": "Create infographic for Incident Response Process",
    "image_path": "/infographics/tech-010_incident_response_process.png",
    "metadata": {
      "id": "TECH-010",
      "title": "Incident Response Process",
      "domain": "technology",
      "complexity": "Medium",
      "dataType": "Process/Sequential",
      "visualStyle": {
        "aspectRatio": "16:9"
      }
    }
  }
];
