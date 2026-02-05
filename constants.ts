
import { NeedCategory } from './types';

export const MHA_SECTIONS = [
    { code: "s2", label: "Section 2 (Assessment)", eligible: false },
    { code: "s3", label: "Section 3 (Treatment)", eligible: true },
    { code: "s4", label: "Section 4 (Emergency)", eligible: false },
    { code: "s5(2)", label: "Section 5(2) (Holding)", eligible: false },
    { code: "s37", label: "Section 37 (Hospital Order)", eligible: true },
    { code: "s37/41", label: "Section 37/41 (Restricted)", eligible: true },
    { code: "s45A", label: "Section 45A (Hybrid Order)", eligible: true },
    { code: "s47", label: "Section 47 (Prison Transfer)", eligible: true },
    { code: "s47/49", label: "Section 47/49 (Restricted Transfer)", eligible: true },
    { code: "s48", label: "Section 48 (Remand Transfer)", eligible: true },
    { code: "s135/136", label: "Section 135/136 (Police Powers)", eligible: false },
    { code: "Informal", label: "Informal / Voluntary", eligible: false },
    { code: "CTO", label: "Community Treatment Order", eligible: true },
];

export const NEILS_NOTES = {
    ORDINARY_RESIDENCE: "Ordinary residence (OR) is 'adopted voluntarily and for settled purposes'. Under s.117, OR is fixed at the point of detention (MHA 1983 s.117(3)).",
    S117_ELIGIBILITY: "s.117 is a joint and several duty. Entitlement flows from qualifying detention; there is no 'lead' agency in law, though local S.75 agreements often define one.",
    CAPACITY: "Capacity is decision-specific. A person may have capacity to choose their lunch but not their discharge address.",
    DOLS: "The 'Acid Test' from Cheshire West: Is the person under continuous supervision and control AND not free to leave?",
    RESTRICTED: "The Secretary of State (Ministry of Justice) has the final say on the discharge of restricted patients, not just the hospital managers.",
    LIMB_2: "Limb 2 is the 'Purpose Test'. Without evidencing how a service prevents readmission, s.117 funding can be lawfully refused.",
    DISPUTE: "Ordinary Residence disputes should follow the formal 'Who Pays' or 'Care Act' dispute resolution procedures. Care must not be delayed while agencies argue."
};

export const JURISDICTION_RULES = {
    s117_LA: {
        title: "s117 Local Authority Responsibility",
        rule: "R (Worcestershire) v SSHSC [2023] UKSC 31",
        explanation: "Responsibility falls to the Local Authority where the person was 'ordinarily resident' immediately before being detained.",
        breakdown: [
            "1. Identify the date of the initial detention.",
            "2. Determine residence immediately before that date.",
            "3. Apply 'Shah' test.",
            "4. No deeming in MHA 1983."
        ]
    },
    s117_ICB: {
        title: "s117 ICB Responsibility",
        rule: "Who Pays? Guidance (July 2025; in force 1 Aug 2025)",
        explanation: "Responsibility lies with the 'Originating ICB'.",
        breakdown: [
            "1. Registered GP at point of initial detention.",
            "2. This ICB retains responsibility for after-care."
        ]
    },
    care_act: {
        title: "Care Act (Non-s117) Responsibility",
        rule: "Care Act 2014 s39 & Annex H",
        explanation: "Deeming applies if LA places person in specified accommodation.",
        breakdown: [
            "1. Specified Accommodation: Deeming applies.",
            "2. Self-Funders: Generally acquire new OR."
        ]
    }
};

export const KNOWLEDGE_HUB_SECTIONS = [
    {
        id: "statutes",
        title: "Statutes & Core Duties",
        items: [
            {
                title: "Mental Health Act 1983, s.117 (After-care)",
                summary: "Statutory duty for after-care following qualifying detention; duty continues until no longer needed.",
                url: "https://www.legislation.gov.uk/ukpga/1983/20/section/117",
                tier: "Free"
            },
            {
                title: "After-care definition (s.117(6))",
                summary: "Services must meet needs arising from or related to the mental disorder and reduce risk of deterioration or readmission.",
                tier: "Free"
            },
            {
                title: "No charging for s.117 after-care",
                summary: "After-care services under s.117 are not chargeable to the person.",
                tier: "Free"
            },
            {
                title: "Care Act 2014 – statutory guidance (Chapter 19 & Annex H)",
                summary: "Ordinary residence rules and dispute resolution references for adult social care.",
                url: "https://www.gov.uk/government/publications/care-act-statutory-guidance",
                tier: "Free"
            },
            {
                title: "Ordinary residence (Shah test)",
                summary: "Ordinary residence generally means living somewhere voluntarily and for a settled purpose, assessed on the overall facts.",
                tier: "Free"
            },
            {
                title: "Deeming for specified accommodation (Care Act s39)",
                summary: "Where a local authority arranges specified accommodation, ordinary residence is deemed to remain with the placing authority.",
                tier: "Free"
            },
            {
                title: "Ordinary residence determinations collection (DHSC)",
                summary: "Collection covering ordinary residence disputes and anonymised determinations.",
                url: "https://www.gov.uk/government/collections/ordinary-residence-pages",
                tier: "Free"
            }
        ]
    },
    {
        id: "guidance",
        title: "Guidance & Reference",
        items: [
            {
                title: "Mental Health Act Code of Practice (2015)",
                summary: "Statutory guidance for MHA duties, including s.117 after-care principles.",
                url: "https://www.gov.uk/government/publications/code-of-practice-mental-health-act-1983",
                tier: "Free"
            },
            {
                title: "Mental Health Act 1983: Reference Guide (2015)",
                summary: "Companion guide explaining how the MHA operates alongside regulations.",
                url: "https://www.gov.uk/government/publications/mental-health-act-1983-reference-guide",
                tier: "Free"
            },
            {
                title: "NHS England Who Pays? (July 2025, in force 1 Aug 2025)",
                summary: "Framework for ICB responsibility, including detention and s.117 after-care commissioning rules.",
                url: "https://www.england.nhs.uk/who-pays/",
                tier: "Free"
            },
            {
                title: "No delay due to funding disputes (Who Pays? principle)",
                summary: "Care and treatment must not be delayed because of uncertainty about responsibility; commissioners should agree interim arrangements.",
                tier: "Free"
            },
            {
                title: "s.117 responsibility test (residence before detention)",
                summary: "Responsibility usually looks to where the person was resident immediately before detention; the hospital of detention is excluded.",
                tier: "Free"
            },
            {
                title: "s.2 then s.3 detention (residence)",
                summary: "Where s.2 leads to s.3 detention, the period of s.2 detention is also excluded when identifying residence for s.117.",
                tier: "Free"
            },
            {
                title: "DHSC position on ordinary residence disputes (Worcestershire case)",
                summary: "DHSC position on stayed disputes pending/after UKSC 31.",
                url: "https://www.gov.uk/government/publications/care-act-statutory-guidance/dhscs-position-on-the-determination-of-ordinary-residence-disputes-pending-the-outcome-of-r-worcestershire-county-council-v-secretary-of-state-for",
                tier: "Free"
            }
        ]
    },
    {
        id: "caselaw",
        title: "Key Case Law",
        items: [
            {
                title: "R (Worcestershire CC) v SSHSC [2023] UKSC 31",
                summary: "Supreme Court decision on ordinary residence for s.117 after-care responsibility.",
                url: "https://www.supremecourt.uk/cases/uksc-2022-0022.html",
                tier: "Free"
            },
            {
                title: "R (Cornwall Council) v Somerset CC [2015] UKSC 46",
                summary: "Leading ordinary residence case where the person lacked capacity to decide where to live.",
                url: "https://www.supremecourt.uk/cases/uksc-2014-0109.html",
                tier: "Free"
            },
            {
                title: "R (Sunderland CC) v South Tyneside [2012] EWCA Civ 1232",
                summary: "Court of Appeal guidance on s.117 residence and the relevance of voluntary admission.",
                tier: "Free"
            },
            {
                title: "R (Worcestershire CC) v Essex CC [2014] EWHC 3557 (Admin)",
                summary: "High Court case on s.117 responsibility where detention under s.2 preceded s.3 and residence was disputed.",
                tier: "Free"
            }
        ]
    },
    {
        id: "ombudsman",
        title: "Ombudsman Decisions",
        items: [
            {
                title: "LGO 19 013 095 (Essex CC / Basildon & Brentwood CCG)",
                summary: "s.117 records, reviews and funding disputes; remedies recommended.",
                url: "https://www.lgo.org.uk/decisions/adult-care-services/assessment-and-care-plan/19-013-095",
                tier: "Free"
            },
            {
                title: "LGO 21 012 744 (Delayed s.117 review)",
                summary: "Fault found for significant delay in carrying out a section 117 review.",
                url: "https://www.lgo.org.uk/decisions/adult-care-services/other/21-012-744",
                tier: "Free"
            },
            {
                title: "LGO 24 017 249 (Move delayed by funding dispute)",
                summary: "Funding dispute delayed move; fault found.",
                url: "https://www.lgo.org.uk/decisions/adult-care-services/assessment-and-care-plan/24-017-249",
                tier: "Free"
            },
            {
                title: "LGO 20 009 117 (Funding dispute delay)",
                summary: "Funding dispute led to delay in agreeing placement and funding; fault found.",
                url: "https://www.lgo.org.uk/decisions/adult-care-services/assessment-and-care-plan/20-009-117",
                tier: "Free"
            }
        ]
    }
];

export const SCENARIO_BANK = [
    {
        id: "scenario-01",
        title: "Self-funder moves across boundaries then funds deplete",
        scenario:
            "An older adult living in Authority A self-funds care, chooses a care home in Authority B to be near family, and signs a private contract. A year later their capital drops and they seek LA funding. Authority B agrees needs require residential care but disputes responsibility with Authority A.",
        questions: [
            "Which authority is ordinarily resident and why?",
            "Does any deeming provision apply?"
        ],
        answer:
            "Ordinary residence is likely Authority B because the person chose to move and settled there as a self-funder. Deeming under section 39 does not apply because Authority A did not arrange the accommodation.",
        choices: [
            "Authority A remains responsible",
            "Authority B is responsible",
            "No settled residence / depends"
        ],
        correctIndex: 1,
        tags: ["ordinary-residence"]
    },
    {
        id: "scenario-02",
        title: "Boundary move with disputed LA involvement",
        scenario:
            "An older adult in Authority A decides to move to a care home in Authority B. Authority A discusses the move and assessment timing but never contracts with the care home. The person moves quickly and signs privately.",
        questions: [
            "If Authority A arranged the placement, where is ordinary residence deemed to be?",
            "If Authority A did not arrange the placement, what changes?"
        ],
        answer:
            "If Authority A arranged the placement, deeming keeps ordinary residence in Authority A. If the person arranged it privately, ordinary residence transfers to Authority B.",
        choices: [
            "Authority A (if LA arranged); Authority B (if private)",
            "Authority B in all cases",
            "Authority A in all cases"
        ],
        correctIndex: 0,
        tags: ["ordinary-residence"]
    },
    {
        id: "scenario-03",
        title: "Self-funder asks LA to arrange placement under section 19",
        scenario:
            "A self-funder in Authority A asks the LA to arrange a placement in Authority B. Authority A contracts with the care home and recovers the cost from the person. After capital depletion, funding responsibility is questioned.",
        questions: [
            "Which authority is responsible under deeming rules?",
            "Does the later financial eligibility change responsibility?"
        ],
        answer:
            "Authority A remains responsible because it arranged the placement under section 19 and deeming applies. Later eligibility does not change ordinary residence.",
        choices: [
            "Authority A remains responsible",
            "Authority B becomes responsible once funds deplete",
            "No settled residence / depends"
        ],
        correctIndex: 0,
        tags: ["ordinary-residence"]
    },
    {
        id: "scenario-04",
        title: "Adult lacking capacity moves to live with family",
        scenario:
            "An adult lacking capacity moves from Authority A to live with family in Authority B with Authority A support and agreement from the family. No specified accommodation applies. The person settles and builds local connections.",
        questions: [
            "How is ordinary residence assessed when capacity is lacking?",
            "Which authority is responsible if the move has a settled purpose?"
        ],
        answer:
            "Assess ordinary residence by settled purpose and overall facts, without requiring voluntariness. If the move is settled and connections are established, ordinary residence transfers to Authority B.",
        choices: [
            "Authority A remains responsible",
            "Authority B becomes responsible",
            "No settled residence / depends"
        ],
        correctIndex: 1,
        tags: ["ordinary-residence"]
    },
    {
        id: "scenario-05",
        title: "No settled residence and short placements",
        scenario:
            "A young adult leaves the family home in Authority A, stays briefly with friends in Authority B, and presents as destitute in B. Authority B provides a care home placement and disputes responsibility with A.",
        questions: [
            "Is there a settled ordinary residence?",
            "Which authority has the duty pending dispute resolution?"
        ],
        answer:
            "There may be no settled ordinary residence; Authority B must meet needs if the person is present in its area while responsibility is resolved.",
        choices: [
            "Authority A must meet needs",
            "Authority B must meet needs while present",
            "No authority has a duty"
        ],
        correctIndex: 1,
        tags: ["ordinary-residence"]
    },
    {
        id: "scenario-06",
        title: "CHC to Care Act switch in care home",
        scenario:
            "An adult from Authority A was placed in a care home in Authority B with NHS CHC funding. After a review, CHC ends and Care Act eligible needs remain. Authority B funds on a without prejudice basis and disputes responsibility with A.",
        questions: [
            "Does time in the care home change ordinary residence?",
            "Which authority is likely responsible?",
        ],
        answer:
            "Time alone does not necessarily shift ordinary residence when placement was arranged by the NHS; responsibility is likely to remain with Authority A, subject to the full facts and guidance.",
        choices: [
            "Authority A likely remains responsible",
            "Authority B becomes responsible due to time",
            "No settled residence / depends"
        ],
        correctIndex: 0,
        tags: ["ordinary-residence", "funding"]
    },
    {
        id: "scenario-07",
        title: "Transition: child placed out of area then turns 18",
        scenario:
            "A child in care was placed in Authority B but remained the responsibility of Authority A under the Children Act. On turning 18, they wish to stay in Authority B with ongoing Care Act needs.",
        questions: [
            "Does ordinary residence transfer at 18?",
            "Which authority funds adult care?",
        ],
        answer:
            "Ordinary residence may transfer if the person capacitously chooses to remain and the Children Act deeming falls away; facts and Care Act rules apply.",
        choices: [
            "Authority A remains responsible",
            "Authority B becomes responsible",
            "Depends on whether placement remains arranged by A"
        ],
        correctIndex: 2,
        tags: ["ordinary-residence", "transition"]
    },
    {
        id: "scenario-08",
        title: "s.117 responsibility after s.2 then s.3 detention",
        scenario:
            "An adult in supported living in Authority B is detained under s.2 and then s.3. The tenancy is terminated during admission. On discharge a year later to Authority A, LA responsibility is disputed.",
        questions: [
            "Which authority is responsible for s.117 after-care?",
            "How does the loss of tenancy affect residence?",
        ],
        answer:
            "Responsibility usually looks to where the person was resident immediately before detention, excluding the detention period. If the tenancy was still available at the point of detention, Authority B is likely responsible. If no residence can be identified, the discharge area may be relevant.",
        choices: [
            "Authority A (discharge area) always",
            "Authority B if tenancy still existed pre‑detention",
            "No authority has responsibility"
        ],
        correctIndex: 1,
        tags: ["s117", "ordinary-residence"]
    },
    {
        id: "scenario-09",
        title: "Staying Put foster placement after 18",
        scenario:
            "A young adult in care placed with foster carers in Authority B remained the responsibility of Authority A under the Children Act. At 18, they choose to stay in Authority B under a Staying Put arrangement and have ongoing Care Act needs.",
        questions: [
            "Does responsibility transfer at 18?",
            "How does Staying Put affect ordinary residence?"
        ],
        answer:
            "It depends on whether the arrangement is still treated as an Authority A placement. If so, deeming may keep responsibility with Authority A; if not and the person chooses to remain, ordinary residence may transfer to Authority B.",
        choices: [
            "Authority A remains responsible",
            "Authority B becomes responsible",
            "Depends on whether placement remains arranged by A"
        ],
        correctIndex: 2,
        tags: ["transition", "ordinary-residence"]
    },
    {
        id: "scenario-10",
        title: "Residential school to supported living at 18",
        scenario:
            "A young adult educated in a residential school in Authority B was the responsibility of Authority A under the Children Act. At 18 they move into supported living in Authority B under the Care Act and wish to remain near friends.",
        questions: [
            "Which authority is responsible after the move?",
            "Does the Care Act placement in B affect ordinary residence?"
        ],
        answer:
            "Once the Children Act placement ends and adult accommodation is under the Care Act in Authority B, ordinary residence may transfer to Authority B, subject to the full facts and any deeming provisions.",
        choices: [
            "Authority A remains responsible",
            "Authority B becomes responsible",
            "No settled residence / depends"
        ],
        correctIndex: 1,
        tags: ["transition", "ordinary-residence"]
    },
    {
        id: "scenario-11",
        title: "Adult with no settled residence moves between authorities",
        scenario:
            "A young adult leaves family in Authority A, stays briefly in Authority B, and seeks help as a destitute adult with care needs. Authority B provides short‑term accommodation and disputes responsibility with A.",
        questions: [
            "Which authority must meet needs while responsibility is unclear?",
            "Is there a settled ordinary residence?"
        ],
        answer:
            "Authority B must meet eligible needs while the person is present in its area if there is no settled ordinary residence; responsibility can be resolved later.",
        choices: [
            "Authority A must meet needs",
            "Authority B must meet needs while present",
            "No authority has a duty"
        ],
        correctIndex: 1,
        tags: ["ordinary-residence"]
    },
    {
        id: "scenario-12",
        title: "CHC ends and LA funding disputed",
        scenario:
            "An adult originally from Authority A receives NHS CHC in a care home in Authority B. CHC ends; Authority B agrees to fund temporarily but disputes responsibility with A.",
        questions: [
            "Does the CHC placement deem ordinary residence to B?",
            "Which authority is likely responsible?"
        ],
        answer:
            "A CHC placement does not automatically deem ordinary residence to the host authority; responsibility often remains with Authority A, depending on the facts and guidance.",
        choices: [
            "Authority A likely remains responsible",
            "Authority B becomes responsible automatically",
            "No settled residence / depends"
        ],
        correctIndex: 0,
        tags: ["funding", "ordinary-residence"]
    },
    {
        id: "scenario-13",
        title: "s.117 responsibility where tenancy still existed",
        scenario:
            "An adult in Authority B had a tenancy in supported living, was detained under s.2 then s.3, and the tenancy was still live at the point of detention. Discharged later to Authority A.",
        questions: [
            "Which authority is responsible for s.117 after‑care?",
            "Why does the tenancy status matter?"
        ],
        answer:
            "Responsibility usually lies with Authority B because residence immediately before detention was in B and the tenancy still existed. The hospital of detention is excluded.",
        choices: [
            "Authority A (discharge area) always",
            "Authority B (pre‑detention residence)",
            "No authority has responsibility"
        ],
        correctIndex: 1,
        tags: ["s117", "ordinary-residence"]
    },
    {
        id: "scenario-14",
        title: "Capacity dispute and residence under s.117",
        scenario:
            "An adult moves from Authority A to Authority B into a hospital placement. Capacity to decide residence is disputed retrospectively. The person is detained under s.2 then s.3.",
        questions: [
            "How does capacity affect residence for s.117?",
            "Is retrospective capacity assessment required?"
        ],
        answer:
            "Residence is assessed on the facts and context for s.117. Retrospective capacity disputes should not obstruct a workable system; focus on where the person was resident before detention.",
        choices: [
            "Capacity must always be determined retrospectively",
            "Residence is assessed by settled purpose and context; avoid retrospective disputes",
            "Residence is always the discharge area"
        ],
        correctIndex: 1,
        tags: ["s117", "ordinary-residence", "caselaw"]
    }
];

export const KNOWLEDGE_PAGES = [
    {
        id: "s117",
        title: "s.117 After-care: Entitlement, Scope and Ending",
        summary: "Plain‑English essentials for eligibility, scope of services and when the duty ends.",
        highlights: [
            "Entitlement arises after qualifying detention and discharge from hospital.",
            "Services must both arise from mental disorder and reduce risk of deterioration/readmission.",
            "The duty ends only by joint LA/ICB decision after review."
        ],
        sections: [
            {
                title: "Who is entitled?",
                text: "Entitlement arises when a person has been detained under qualifying MHA sections and then leaves hospital after detention. The duty is joint between the ICB and the local authority.",
                sources: [
                    { label: "Mental Health Act 1983, s.117", url: "https://www.legislation.gov.uk/ukpga/1983/20/section/117" }
                ],
                checklist: [
                    "Confirm the qualifying detention section.",
                    "Record the date detention ended and the discharge destination.",
                    "Identify the responsible LA and ICB."
                ]
            },
            {
                title: "Qualifying detention sections (examples)",
                text: "Common qualifying sections include s.3, s.37, s.37/41, s.47, s.47/49, s.48, and CTO‑related detention. Assessment‑only detention (s.2) does not itself trigger entitlement, but is often part of a pathway to s.3.",
                checklist: [
                    "Record both s.2 and s.3 dates if applicable.",
                    "Confirm the legal status at discharge.",
                    "Note any restrictions (e.g., s.37/41)."
                ]
            },
            {
                title: "What counts as after-care?",
                text: "After‑care services must meet needs arising from or related to the mental disorder and reduce the risk of deterioration or readmission. Guidance emphasises a broad view of services when those tests are met.",
                sources: [
                    { label: "MHA Code of Practice (2015)", url: "https://www.gov.uk/government/publications/code-of-practice-mental-health-act-1983" },
                    { label: "LGO 21 012 744 (summary of Code para 33.3/33.4)", url: "https://www.lgo.org.uk/decisions/adult-care-services/other/21-012-744" }
                ],
                checklist: [
                    "Identify the mental disorder‑related need.",
                    "Explain how the service reduces risk of deterioration or readmission.",
                    "Record the decision and the rationale."
                ],
                pitfalls: [
                    "Treating generic social care as s.117 without evidencing the s.117(6) tests.",
                    "Failing to record the link between the service and the risk of readmission."
                ]
            },
            {
                title: "Limb 2 evidence (risk of deterioration/readmission)",
                text: "Record specific evidence that shows how the service reduces risk. Panels often refuse funding where the causal link is not evidenced.",
                checklist: [
                    "Describe what happens when the service is withdrawn.",
                    "Link the service to relapse prevention or crisis avoidance.",
                    "Use history or clinical judgment to support the rationale."
                ],
                pitfalls: [
                    "Using vague statements like 'support is helpful' without explaining the risk pathway.",
                    "Listing services without any risk‑reduction rationale."
                ]
            },
            {
                title: "s.117 vs Care Act: separating needs",
                text: "s.117 covers needs arising from mental disorder and aimed at preventing deterioration. Care Act covers eligible needs that are not linked to the mental disorder or do not meet the s.117(6) tests.",
                checklist: [
                    "Allocate each need to s.117 or Care Act with a short rationale.",
                    "Record where needs are shared or overlapping.",
                    "Review allocations at each review."
                ]
            },
            {
                title: "Charging and direct payments",
                text: "s.117 after‑care is not chargeable to the person. Direct payments can be used where lawful and agreed locally.",
                checklist: [
                    "Record that s.117 services are non‑chargeable.",
                    "If direct payments are used, record the rationale and agreements."
                ]
            },
            {
                title: "Accommodation preference",
                text: "Where accommodation is part of the after‑care plan, statutory rules allow a preference for accommodation, subject to suitability and funding rules.",
                checklist: [
                    "Record the accommodation rationale and any preferences.",
                    "Explain suitability and how s.117 tests are met."
                ]
            },
            {
                title: "Records and review discipline",
                text: "Guidance stresses joint single records for s.117 after‑care, covering funding decisions and a clear chronology. Records should be kept up‑to‑date and reviewed regularly.",
                sources: [
                    { label: "Discharge from mental health inpatient settings (MHA Code para 33.7)", url: "https://www.gov.uk/government/publications/discharge-from-mental-health-inpatient-settings/discharge-from-mental-health-inpatient-settings" }
                ],
                checklist: [
                    "Maintain a shared s.117 record between LA and ICB.",
                    "Record funding decisions and the supporting evidence.",
                    "Schedule and log review dates."
                ],
                pitfalls: [
                    "Leaving responsibility unclear on the record.",
                    "Reviews not scheduled or tracked."
                ]
            },
            {
                title: "Ending the duty",
                text: "The duty continues until both the ICB and local authority are satisfied that after‑care is no longer needed. Reviews should be regular and documented.",
                sources: [
                    { label: "Mental health aftercare in England and Wales (2015)", url: "https://www.gov.uk/government/publications/mental-health-aftercare-in-england-and-wales" },
                    { label: "LGO 21 012 744 (review delays)", url: "https://www.lgo.org.uk/decisions/adult-care-services/other/21-012-744" }
                ],
                pitfalls: [
                    "Ending s.117 because services are delivered by a different team.",
                    "Assuming time passed means the duty ends without a joint review."
                ]
            }
        ]
    },
    {
        id: "ordinary-residence",
        title: "Ordinary Residence: Care Act + s.117",
        summary: "How to identify responsibility for adult social care and s.117 after‑care.",
        highlights: [
            "Care Act: settled‑purpose test plus deeming for LA‑arranged specified accommodation.",
            "s.117: no Care Act deeming; responsibility looks to residence immediately before detention.",
            "Exception: where enhanced s.117 accommodation applies, after‑care LA also takes Care Act responsibility."
        ],
        sections: [
            {
                title: "Care Act: core approach",
                text: "Ordinary residence generally means living somewhere voluntarily and for a settled purpose, assessed on the overall facts. Deeming applies where a local authority arranges specified accommodation.",
                sources: [
                    { label: "Care Act statutory guidance (Chapter 19 & Annex H)", url: "https://www.gov.uk/government/publications/care-act-statutory-guidance" },
                    { label: "Ordinary residence collection", url: "https://www.gov.uk/government/collections/ordinary-residence-pages" }
                ],
                checklist: [
                    "Identify the last settled residence.",
                    "Check if specified accommodation was arranged by a local authority (deeming).",
                    "If capacity is lacking, assess settled purpose on overall facts."
                ],
                pitfalls: [
                    "Assuming a short stay automatically changes ordinary residence.",
                    "Ignoring deeming where the LA arranged specified accommodation."
                ]
            },
            {
                title: "Care Act: deeming for specified accommodation",
                text: "If a local authority arranges specified accommodation, ordinary residence is deemed to remain with the placing authority even when accommodation is out of area.",
                bullets: [
                    "Nursing homes/care homes: accommodation that includes nursing care or personal care.",
                    "Supported living/extra care housing: either specialist or adapted accommodation (features built in/changed to meet care needs, including safety/accessibility features), or accommodation intended for adults with care and support needs where personal care is also available (usually from a different provider).",
                    "Shared Lives schemes: accommodation and care/support provided by an approved Shared Lives carer in the carer’s home under an agreement between the adult, the carer and any responsible local authority. Personal care is normally provided but is not required in every case."
                ],
                pitfalls: [
                    "Not specified: general housing without personal care provision or without specialist/adapted features.",
                    "Not specified: placements arranged solely by the individual (self‑funded) without LA arranging the accommodation."
                ],
                checklist: [
                    "Confirm whether the LA arranged the placement.",
                    "Check whether the accommodation is ‘specified’ for deeming.",
                    "Record the legal basis for the deeming decision (regulation/guidance reference)."
                ]
            },
            {
                title: "Care Act: self‑funders and LA involvement",
                text: "If a person self‑funds and chooses their own placement, ordinary residence may transfer to the host authority. If the LA arranges under Care Act powers, deeming may keep responsibility with the placing authority.",
                checklist: [
                    "Clarify who arranged the contract and paid the provider.",
                    "Check whether the LA used section 19 arrangements.",
                    "Record any written communications that show who arranged the placement."
                ]
            },
            {
                title: "MHA s.117: responsibility and residence",
                text: "For s.117 after‑care, responsibility looks to where the person was resident immediately before detention. Care Act deeming provisions do not apply to s.117.",
                sources: [
                    { label: "Mental health aftercare in England and Wales (2015)", url: "https://www.gov.uk/government/publications/mental-health-aftercare-in-england-and-wales" },
                    { label: "Worcestershire UKSC 31 (2023)", url: "https://www.supremecourt.uk/cases/uksc-2022-0022.html" }
                ],
                checklist: [
                    "Identify residence immediately before detention (exclude detention period).",
                    "Do not apply Care Act deeming to s.117.",
                    "Record the rationale for the responsible LA and ICB."
                ]
            },
            {
                title: "MHA s.117: key case law signal",
                text: "UKSC 46 (Cornwall/Somerset) confirms approach to ordinary residence when the person lacks capacity to decide where to live.",
                sources: [
                    { label: "Cornwall/Somerset UKSC 46 (2015)", url: "https://www.supremecourt.uk/cases/uksc-2014-0109" }
                ]
            },
            {
                title: "Enhanced s.117 accommodation (exception)",
                text: "Where enhanced s.117 accommodation applies, the after‑care local authority also takes responsibility for Care Act duties in that placement. This is an exception to the general rule that Care Act deeming does not apply to s.117.",
                checklist: [
                    "Confirm the accommodation is treated as enhanced s.117.",
                    "Record the agreement that after‑care LA also holds Care Act responsibility."
                ]
            }
        ]
    },
    {
        id: "funding",
        title: "Funding Responsibility: ICB vs Local Authority",
        summary: "How NHS responsibility is determined and what to do when there is uncertainty.",
        highlights: [
            "Identify responsible ICB using the Who Pays? rules.",
            "Do not delay care because of funding disputes.",
            "Record interim arrangements and shared costs."
        ],
        sections: [
            {
                title: "Who Pays? framework",
                text: "Who Pays? sets the rules for which NHS commissioner is responsible for commissioning and paying for care.",
                sources: [
                    { label: "NHS England – Who Pays? v4 (July 2025)", url: "https://www.england.nhs.uk/long-read/who-pays-v4/" },
                    { label: "NHS England – Who Pays? hub", url: "https://www.england.nhs.uk/who-pays/" }
                ],
                checklist: [
                    "Identify the responsible ICB under the Who Pays? rules.",
                    "Document the rationale and evidence.",
                    "Share the decision with partner agencies."
                ],
                pitfalls: [
                    "Unclear ICB identification at the point of detention.",
                    "Lack of written rationale leading to disputes later."
                ]
            },
            {
                title: "No‑delay principle",
                text: "Care and treatment must not be delayed because of uncertainty about which commissioner pays; interim arrangements should be agreed.",
                sources: [
                    { label: "Who Pays? v4 (July 2025) – Executive summary", url: "https://www.england.nhs.uk/long-read/who-pays-v4/" }
                ],
                pitfalls: [
                    "Delaying discharge or placement while responsibility is disputed.",
                    "Missing a written agreement on interim funding."
                ]
            },
            {
                title: "Dispute handling",
                text: "Where disputes arise, commissioners should agree interim funding and follow formal dispute processes without delaying care.",
                checklist: [
                    "Agree interim funding on a without‑prejudice basis.",
                    "Document who is paying and why.",
                    "Record the dispute process and decision."
                ]
            },
            {
                title: "s.117 and ICB responsibility",
                text: "Identify the originating ICB at the point of detention and document it. That ICB typically remains responsible for after‑care.",
                checklist: [
                    "Record GP registration at point of detention.",
                    "Confirm the originating ICB for the person.",
                    "Store the rationale with the care plan."
                ]
            }
        ]
    },
    {
        id: "caselaw",
        title: "Case Law Digest: What Matters in Practice",
        summary: "Short, practical takeaways from leading cases.",
        highlights: [
            "UKSC 31 clarifies s.117 responsibility for ordinary residence.",
            "UKSC 46 clarifies residence for people lacking capacity.",
            "EWHC 3557 confirms approach when s.2 precedes s.3."
        ],
        sections: [
            {
                title: "Worcestershire (UKSC 31)",
                text: "Clarifies how ordinary residence is determined for s.117 responsibility in complex detention histories.",
                sources: [
                    { label: "UKSC 31 (2023)", url: "https://www.supremecourt.uk/cases/uksc-2022-0022.html" }
                ]
            },
            {
                title: "Cornwall/Somerset (UKSC 46)",
                text: "Confirms approach to ordinary residence when the person lacks capacity to decide where to live.",
                sources: [
                    { label: "UKSC 46 (2015)", url: "https://www.supremecourt.uk/cases/uksc-2014-0109" }
                ]
            },
            {
                title: "Worcestershire v Essex [2014] EWHC 3557 (Admin)",
                text: "High Court decision addressing residence when s.2 detention precedes s.3 and disputes about capacity and residence arise.",
                sources: [
                    { label: "W v E [2014] EWHC 3557", url: "https://www.bailii.org/ew/cases/EWHC/Admin/2014/3557.html" }
                ]
            },
            {
                title: "Sunderland v South Tyneside [2012] EWCA Civ 1232",
                text: "Court of Appeal guidance on residence and voluntary admission before detention.",
                sources: [
                    { label: "R (Sunderland) v South Tyneside [2012] EWCA Civ 1232", url: "https://www.bailii.org/ew/cases/EWCA/Civ/2012/1232.html" }
                ]
            }
        ]
    },
    {
        id: "ombudsman",
        title: "Ombudsman Lessons: Where Things Go Wrong",
        summary: "Recurring themes that lead to findings of fault.",
        highlights: [
            "Delays in reviews are a common fault.",
            "Poor records and unclear responsibility lead to findings.",
            "Disputes must not delay care."
        ],
        sections: [
            {
                title: "Review delays",
                text: "Ombudsman decisions highlight that significant delays in s.117 reviews are fault and require remedies.",
                sources: [
                    { label: "LGO 21 012 744", url: "https://www.lgo.org.uk/decisions/adult-care-services/other/21-012-744" }
                ]
            },
            {
                title: "Unclear responsibility",
                text: "Confusion between agencies about responsibility and records can lead to avoidable delays.",
                sources: [
                    { label: "LGO 21 012 744", url: "https://www.lgo.org.uk/decisions/adult-care-services/other/21-012-744" }
                ],
                checklist: [
                    "Keep a joint record of s.117 after‑care decisions and reviews.",
                    "Document the agreed responsible LA and ICB.",
                    "Schedule review dates at least annually."
                ]
            },
            {
                title: "Funding disputes",
                text: "Where a dispute about funding causes delay to placement or discharge, Ombudsman findings often identify fault.",
                checklist: [
                    "Agree interim funding while disputes are resolved.",
                    "Document who is paying and how costs are shared.",
                    "Keep the person informed of timelines and decisions."
                ]
            }
        ]
    }
];

export const INITIAL_PATIENT_DETAILS = {
  name: '',
  address: '',
  dob: '',
  nhsNumber: '',
  socialCareId: '',
  lacStatus: '',
  firstLanguage: '',
  mhaSection: '',
  isRestricted: false,
  mojCaseWorker: '',
  detentionStartDate: '', 
  conditionsOfDischarge: '',
  diagnoses: '',
  s117Rights: '',
  legalFrameworks: '',
  isInitialPlan: true,
  isReviewPlan: false,
  s117Limb2Evidence: '',
  dolSupervision: false,
  dolFreeToLeave: true,
  dolCapacity: false,
  mcaAssessmentRationale: '',
  bestInterestsRationale: '',
  imhaReferralDone: false,
  imcaReferralDone: false,
  responsibleLA: '',
  responsibleICB: '',
  responsibilityRationale: '',
  disputeStatus: 'None' as 'None' | 'Active',
  nearestRelative: '',
  familyMembers: '',
  victimLiaisonOfficer: '',
  advocateContact: '',
  consultantName: '',
  careCoordinator: '',
  socialWorkerName: '',
  gpContact: '',
  otherPros: '',
  setting: '',
  currentArrangements: '',
  confidenceLevel: '',
  decisionConfidence: 70,
  decisionConfidenceNotes: '',
  statutoryFunding: '',
  completedBy: '',
  designation: '',
  completionDate: new Date().toISOString().split('T')[0],
  version: '1.0',
  isEnding: false,
  nextReviewDate: '',
  caseStatus: 'Draft' as 'Draft' | 'In Review' | 'Finalised',
  clinicianName: '', 
  personComments: '',
  familyComments: '',
  advocateComments: '',
  nextSteps: '',
};

export const CARE_ACT_OUTCOMES = [
    "Managing and maintaining nutrition",
    "Maintaining personal hygiene",
    "Managing toilet needs",
    "Being appropriately clothed",
    "Being able to make use of the home safely",
    "Maintaining a habitable home environment",
    "Developing and maintaining family or other personal relationships",
    "Accessing and engaging in work, training, education or volunteering",
    "Making use of necessary facilities or services in the local community",
    "Carrying out any caring responsibilities the adult has for a child"
];

export const UNABLE_TO_ACHIEVE_CRITERIA = [
    "Is unable to achieve it without assistance",
    "Is able to achieve it without assistance but doing so causes significant pain, distress or anxiety",
    "Is able to achieve it without assistance but endangers the health or safety of the adult or others",
    "Is able to achieve it without assistance but takes significantly longer than would normally be expected"
];

export const LEGAL_DEFINITIONS = {
  [NeedCategory.S117]: {
    title: "s117 After-care (MHA 1983)",
    description: "Services provided to meet needs arising from mental disorder and reduce readmission risk.",
    responsibility: "Joint ICB/LA duty.",
    criteria: [
        "Limb 1: Need arises from or relates to the mental disorder.",
        "Limb 2: Service reduces risk of condition deteriorating/readmission."
    ]
  },
  [NeedCategory.CARE_ACT]: {
    title: "Care Act 2014 (Non-s117)",
    description: "Eligible social care needs unrelated to the mental disorder.",
    responsibility: "LA responsibility (Subject to financial assessment).",
    criteria: [
        "Arises from physical/mental impairment.",
        "Unable to achieve 2+ outcomes.",
        "Significant impact on wellbeing."
    ]
  },
  [NeedCategory.PHYSICAL_HEALTH]: {
    title: "Physical Health / CHC",
    description: "Healthcare needs for physical conditions.",
    responsibility: "ICB responsibility.",
    criteria: [
        "Treatment of physical health.",
        "Diabetes, wound care, mobility, etc."
    ]
  },
};

export const SUGGESTED_NEEDS = {
  [NeedCategory.S117]: [
    { label: "Medication management (Mental Health)", intervention: "Daily support worker visits to prompt/administer antipsychotic medication" },
    { label: "Social isolation / meaningful activity", intervention: "Support worker to facilitate access to community groups" },
    { label: "Managing distress / anxiety", intervention: "1:1 Psychology sessions or CPN monitoring" },
    { label: "Sensory regulation (Autism/ND)", intervention: "Occupational Therapy adaptations" }
  ],
  [NeedCategory.CARE_ACT]: [
    { label: "Personal care (Physical frailty)", intervention: "Carer calls AM/PM" },
    { label: "Nutrition (Physical inability)", intervention: "Meals on Wheels" }
  ],
  [NeedCategory.PHYSICAL_HEALTH]: [
    { label: "Diabetes management", intervention: "District Nurse to administer insulin" },
    { label: "Wound care", intervention: "District Nurse dressing changes" }
  ]
};
