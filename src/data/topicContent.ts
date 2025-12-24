export interface TopicSection {
  heading: string
  content: string | string[]
  subsections?: {
    heading: string
    content: string | string[]
  }[]
}

export interface DetailedTopicContent {
  topicId: string
  introduction: string[]
  learningPoints?: string[]
  sections: TopicSection[]
  practiceGuidance?: string[]
}

export const topicDetailedContent: Record<string, DetailedTopicContent> = {
  'theoretical-models': {
    topicId: 'theoretical-models',
    introduction: [
      'Theoretical models of disability are different ways of understanding what disability is, where it comes from, and how society should respond to it.',
      'No single model fully explains the lived experience of disability. Each one highlights certain truths while overlooking others. In real-world accessibility work, organizations and practitioners often draw from multiple models at the same time, especially the medical and social models.'
    ],
    learningPoints: [
      'recognize hidden assumptions in design and policy decisions,',
      'choose appropriate solutions to accessibility problems,',
      'and explain why a particular approach makes sense in a given context.'
    ],
    sections: [
      {
        heading: 'The medical model',
        content: [
          'The medical model views disability primarily as a characteristic of the individual. Disability is understood as the result of disease, injury, or health conditions that may require treatment, rehabilitation, or ongoing management.',
          'From this perspective, the "problem" is located in the body or mind of the person, and solutions focus on medical care, diagnosis, or attempts to restore typical functioning.'
        ],
        subsections: [
          {
            heading: 'Strengths',
            content: [
              'Acknowledges the real biological and health-related aspects of disability.',
              'Supports clinical treatment, pain management, and rehabilitation where these are needed.',
              'Reflects the lived reality of many people who rely on medical care or assistive interventions.'
            ]
          },
          {
            heading: 'Limitations',
            content: [
              'Can frame disability as something that needs to be fixed or cured.',
              'Often overlooks barriers created by environments, systems, and attitudes.',
              'May contribute to feelings of exclusion or pressure to conform to narrow norms.'
            ]
          }
        ]
      },
      {
        heading: 'The social model',
        content: [
          'The social model shifts attention away from the individual and toward society. It distinguishes between impairment (a bodily or cognitive difference) and disability (the barriers that prevent participation).',
          'In this model, people are disabled not by their impairments, but by inaccessible buildings, technologies, policies, and social attitudes.'
        ],
        subsections: [
          {
            heading: 'Strengths',
            content: [
              'Forms the foundation of accessibility and universal design.',
              'Emphasizes that barriers are not inevitable — they are designed and can be redesigned.',
              'Frames accessibility as a collective responsibility and a human rights issue.'
            ]
          },
          {
            heading: 'Limitations',
            content: [
              'Can underplay the physical, sensory, or cognitive aspects of disability.',
              'May struggle to address situations where medical or personal support is essential.',
              'Political advocacy rooted in this model can sometimes create friction or resistance.'
            ]
          }
        ]
      },
      {
        heading: 'The biopsychosocial model',
        content: [
          'The biopsychosocial model combines medical, psychological, and social perspectives. Disability is understood as the result of interaction between:',
          'biological factors (health and impairment),',
          'psychological factors (emotions, coping strategies),',
          'and social factors (environment, culture, support systems).',
          'This model underpins the World Health Organization\'s International Classification of Functioning, Disability and Health (ICF).'
        ],
        subsections: [
          {
            heading: 'Strengths',
            content: [
              'Avoids false binaries between "medical" and "social" explanations.',
              'Supports more holistic, person-centered approaches.',
              'Useful in rehabilitation, healthcare, and support planning.'
            ]
          },
          {
            heading: 'Limitations',
            content: [
              'Can be complex and difficult to apply consistently.',
              'Risks diluting attention from medical needs if poorly implemented.',
              'Requires coordination across systems that may not communicate well.'
            ]
          }
        ]
      },
      {
        heading: 'The economic model',
        content: [
          'The economic model focuses on disability in relation to work and productivity. Disability is assessed based on how impairments affect employment, income, and economic participation.',
          'This model is often used in policymaking, especially for determining eligibility for benefits and accommodations.'
        ],
        subsections: [
          {
            heading: 'Strengths',
            content: [
              'Recognizes the economic impact of disability on individuals and society.',
              'Can justify financial support, workplace accommodations, and social benefits.'
            ]
          },
          {
            heading: 'Limitations',
            content: [
              'Reduces disability to legal or financial thresholds.',
              'Can be stigmatizing by framing people as "dependent" or "unproductive."',
              'May exclude people whose needs don\'t fit strict definitions.'
            ]
          }
        ]
      },
      {
        heading: 'The functional solutions model',
        content: [
          'The functional solutions model focuses on practical outcomes. It identifies functional limitations and aims to reduce their impact through tools, technology, or process changes.',
          'Much of accessibility practice aligns with this model — designing solutions that help people accomplish tasks.'
        ],
        subsections: [
          {
            heading: 'Strengths',
            content: [
              'Action-oriented and pragmatic.',
              'Directly improves usability and access in real situations.',
              'Encourages innovation and service provision.'
            ]
          },
          {
            heading: 'Limitations',
            content: [
              'Can overemphasize technology at the expense of social or systemic change.',
              'Risks producing solutions that are novel but not truly useful.',
              'May ignore broader barriers if focused too narrowly on tools.'
            ]
          }
        ]
      },
      {
        heading: 'The social identity or cultural affiliation model',
        content: [
          'This model views disability as part of personal and group identity. Disability can be a source of shared culture, language, and community — not just a limitation.',
          'This is particularly visible in Deaf culture, but also applies to other disability communities.'
        ],
        subsections: [
          {
            heading: 'Strengths',
            content: [
              'Affirms disability as a valid and meaningful identity.',
              'Builds community, pride, and shared understanding.',
              'Resists narratives that frame disability only as deficit.'
            ]
          },
          {
            heading: 'Limitations',
            content: [
              'Group identity can unintentionally exclude those who don\'t fully align.',
              'Experiences within disability communities are not uniform.'
            ]
          }
        ]
      },
      {
        heading: 'The charity model',
        content: [
          'The charity model frames people with disabilities as recipients of help and goodwill. Disability is seen as a misfortune requiring assistance from others.'
        ],
        subsections: [
          {
            heading: 'Strengths',
            content: [
              'Can mobilize resources and support in urgent situations.',
              'Encourages compassion and generosity.'
            ]
          },
          {
            heading: 'Limitations',
            content: [
              'Often reinforces pity and dependency.',
              'Focuses on short-term relief rather than systemic change.',
              'Can undermine autonomy and dignity.'
            ]
          }
        ]
      },
      {
        heading: 'Using models in accessibility practice',
        content: [
          'In accessibility work, no single model is "correct." The key skill is recognizing which model is being applied, what it enables, and what it leaves out.',
          'Strong accessibility decisions often:',
          'acknowledge medical realities without centering them exclusively,',
          'prioritize removing environmental barriers,',
          'and respect disability as both a lived experience and a social condition.',
          'Rather than memorizing definitions, focus on asking:',
          'Where is the barrier?',
          'Who is expected to change?',
          'What assumptions are shaping this solution?'
        ]
      }
    ]
  },
  'demographics-statistics': {
    topicId: 'demographics-statistics',
    introduction: [
      'Disability demographics and statistics are about understanding how many people experience disability, where they live, and how disability intersects with health, education, employment, income, and daily life. This topic focuses less on exact numbers and more on learning how to interpret data responsibly, recognizing what statistics can tell us—and what they cannot. Because disability is defined and measured differently across countries and studies, data must always be read within its social, cultural, and methodological context.',
      'In accessibility work, disability statistics help frame the scale of issues, guide policy and design decisions, and support advocacy for inclusive systems. At the same time, these numbers are shaped by real-world limitations such as inconsistent terminology, underreporting, and the complexity of people living with multiple disabilities. Understanding both the value and the limits of disability data is essential for making informed, ethical decisions.'
    ],
    learningPoints: [
      'Recognize why disability data is collected and how it informs policy and design decisions',
      'Understand the structural and methodological limits of disability statistics',
      'Interpret disability data without overstating precision or certainty',
      'Identify global patterns and disparities affecting people with disabilities',
      'Communicate disability statistics responsibly and contextually'
    ],
    sections: [
      {
        heading: 'Why Disability Statistics Matter',
        content: [
          'Disability statistics are used to understand populations, plan services, shape public policy, and allocate resources. Data about disability can influence decisions in areas such as healthcare, transportation, housing, education, employment, and social protection. When policymakers and organizations understand how many people experience functional limitations—and what kinds—they are better positioned to design systems that work for real populations rather than hypothetical "average" users.',
          'Statistics also help illustrate scale. Knowing that disability affects a significant portion of the global population challenges assumptions that disability is rare or exceptional. Even imperfect data can be powerful when used to show trends, gaps, and inequities that might otherwise remain invisible.'
        ]
      },
      {
        heading: 'How Disability Data Is Collected',
        content: [
          'Disability data is gathered through many sources, including national censuses, household surveys, health studies, and administrative records. These sources vary widely in how they define disability, what questions they ask, and which populations they reach. Some focus on medical diagnoses, others on functional limitations, and others on self-identification.',
          'Because there is no single global definition of disability, comparisons between countries or studies are often difficult. A person counted as "disabled" in one dataset may not appear in another simply because the criteria differ. This variability makes context essential when reading or sharing statistics.'
        ]
      },
      {
        heading: 'Key Limitations of Disability Statistics',
        content: 'There are several well-known challenges in collecting accurate disability data:',
        subsections: [
          {
            heading: 'Common challenges',
            content: [
              'Limited detail in large surveys: Many national censuses do not collect detailed information about types of disability, severity, or lived experience.',
              'Inconsistent terminology: Words used to describe disability vary across languages, cultures, and legal systems, making direct comparison unreliable.',
              'Multiple and overlapping disabilities: Many people experience more than one disability, which can place them outside rigid statistical categories.',
              'Underreporting: Stigma, fear of discrimination, or lack of diagnosis may lead people not to disclose disability.',
              'Contextual factors: Disability can be influenced by environment, age, poverty, conflict, and access to healthcare—factors that statistics often struggle to capture fully.'
            ]
          },
          {
            heading: 'What this means',
            content: [
              'These limitations do not make disability data useless, but they do mean the numbers should be treated as indicators rather than exact counts.'
            ]
          }
        ]
      },
      {
        heading: 'Global Patterns and Health Inequities',
        content: [
          'Global health data shows that disability is common and closely linked to broader social and economic conditions. People with disabilities, on average, experience poorer health outcomes, reduced life expectancy, and higher risk of secondary conditions. These patterns are not caused by disability itself, but by barriers such as inaccessible healthcare, poverty, discrimination, and exclusion from education and employment.',
          'Transportation, for example, is a recurring barrier. Inaccessible or unaffordable transport limits access to healthcare, work, and community life, compounding disadvantage. These inequities highlight how disability statistics often reflect systemic failures rather than individual limitations.'
        ]
      },
      {
        heading: 'Disability Data as an Input to Policy',
        content: [
          'Reliable disability data is especially valuable for public policy. Information about functional limitations can inform decisions in health services, social protection systems, urban planning, education, and labor markets. Data can help answer questions such as how many people with disabilities are employed, how income levels compare, or how many people live in poverty.',
          'When used well, statistics support evidence-based decisions and long-term planning. When used poorly—without context or nuance—they can reinforce stereotypes or justify exclusion. Responsible use of disability data requires both technical understanding and ethical judgment.'
        ]
      },
      {
        heading: 'Using Disability Statistics Responsibly',
        content: [
          'When analyzing or communicating disability statistics, it is important to be transparent about limitations and assumptions. Numbers should not be presented as absolute truth, but as part of a broader picture that includes lived experience and qualitative insight.',
          'Disability statistics are most effective when they are used to support inclusion, challenge inequity, and inform better design—not when they are treated as definitive or detached from real human lives.'
        ]
      }
    ]
  },
  'disability-etiquette': {
    topicId: 'disability-etiquette',
    introduction: [
      'Disability etiquette is about interacting with people with disabilities in ways that are respectful, inclusive, and grounded in basic human dignity. It is not a rigid rulebook, but a shared set of social practices that help avoid harm, reduce awkwardness, and support equal participation. At its core, disability etiquette emphasizes seeing people as individuals first, rather than defining them by assumptions about their bodies, minds, or abilities.',
      'In professional and everyday contexts, disability etiquette influences how we speak, how we offer help, how we make decisions, and how we refer to people in conversation and writing. Practicing good etiquette means being attentive to language, behavior, and power dynamics, and recognizing that people with disabilities are the best authorities on their own needs, preferences, and experiences.'
    ],
    learningPoints: [
      'Recognize respectful ways to interact with people with disabilities',
      'Avoid common assumptions and unintentional exclusion',
      'Apply inclusive language thoughtfully and appropriately',
      'Support autonomy, privacy, and personal agency',
      'Communicate about disability with clarity and respect'
    ],
    sections: [
      {
        heading: 'Disability Etiquette as a Practice',
        content: [
          'Disability etiquette refers to shared social norms that guide respectful interaction and communication. These norms apply both to direct, face-to-face interactions and to how people with disabilities are discussed in writing, meetings, products, and policies. Good etiquette is less about perfection and more about intention, awareness, and willingness to learn.',
          'Because disability experiences vary widely, etiquette focuses on flexibility rather than one-size-fits-all rules. What is respectful in one situation or culture may not be in another. The guiding principle is to treat people with disabilities as full participants in social and professional life, capable of making decisions and expressing preferences for themselves.'
        ]
      },
      {
        heading: 'Interacting Directly with People with Disabilities',
        content: [
          'One of the most important principles of disability etiquette is direct communication. When speaking with someone who has a disability, address them directly rather than speaking through a companion, interpreter, or assistant. This reinforces respect and acknowledges the person\'s autonomy.',
          'Avoid making assumptions about what someone can or cannot do. Disabilities affect people differently, even when they share the same diagnosis. Assumptions—whether overly negative or overly positive—can be limiting and dismissive. Instead, allow the person to define their own capabilities.',
          'Offering help should also be handled thoughtfully. Assistance should be provided only when it is requested, or after asking permission. Unsolicited help, even when well intentioned, can be intrusive or disempowering. Asking first allows the person to accept, decline, or guide the assistance in a way that works for them.',
          'Respect for personal space and privacy is equally important. Mobility aids, assistive devices, and service animals are part of a person\'s personal space. Touching a wheelchair, cane, communication device, or other equipment without permission is equivalent to touching the person themselves and should be avoided.'
        ]
      },
      {
        heading: 'Respecting Autonomy and Decision-Making',
        content: [
          'Disability etiquette recognizes that people with disabilities are capable of making decisions about their own lives. This includes decisions about accommodations, communication methods, and levels of assistance. Avoid speaking as if someone lacks agency or judgment simply because they have a disability.',
          'In professional settings, this means including people with disabilities in conversations that affect them, rather than making decisions on their behalf. In everyday interactions, it means listening, trusting self-reported needs, and respecting boundaries.'
        ]
      },
      {
        heading: 'Inclusive Language and Its Role',
        content: [
          'Language plays a powerful role in shaping attitudes toward disability. Inclusive language aims to reduce stigma and avoid framing disability as a defining flaw or limitation. One widely recommended approach is people-first language, which places the person before the disability, emphasizing that disability is one aspect of a person rather than their entire identity.',
          'However, language preferences are not universal. Some people and communities prefer identity-first language, which treats disability as an integral and valued part of identity rather than something separate. This approach is often embraced within disability communities as a form of self-definition and pride.',
          'Because preferences vary, the most respectful approach in direct communication is to ask individuals how they prefer to be described and to follow their lead. When writing or speaking more generally, it is important to use neutral, respectful terms and avoid language that implies pity, tragedy, or heroism.'
        ]
      },
      {
        heading: 'Applying Etiquette in Real Contexts',
        content: [
          'Disability etiquette is not limited to interpersonal behavior. It also affects how organizations communicate, design systems, and establish norms. Policies, documentation, and public messaging should reflect respect, accuracy, and inclusion rather than stereotypes or outdated language.',
          'Practicing disability etiquette is an ongoing process. It involves reflection, openness to feedback, and a willingness to adjust behavior as understanding grows. When applied consistently, it supports more inclusive environments where people with disabilities are respected as peers, collaborators, and decision-makers.'
        ]
      }
    ]
  },
  'categories-characteristics': {
    topicId: 'categories-characteristics',
    introduction: [
      'This section explains the major disability categories you\'re likely to encounter in accessibility work and what those categories often mean in real life. It describes typical ways disabilities can affect perception, communication, movement, thinking, and emotional regulation—while emphasizing that the same diagnosis can look very different from one person to the next.',
      'It also connects disability to the barriers people face in everyday environments and digital products. The goal is to build a clear mental model: disability is not just about an individual\'s body or mind, but about how well (or poorly) tools, spaces, content, and social practices support a wide range of human variation.'
    ],
    learningPoints: [
      'Recognize major disability categories and the kinds of impacts they can have',
      'Identify common environmental and digital barriers that disable people in practice',
      'Explain why "same diagnosis" does not mean "same needs"',
      'Apply practical, non-technology solutions that remove barriers in spaces and interfaces',
      'Connect accessibility decisions to real participation outcomes'
    ],
    sections: [
      {
        heading: 'A useful way to think about disability categories',
        content: [
          'Disability categories are often grouped by the kinds of activities that are affected—like seeing, hearing, speaking, moving, concentrating, processing information, or regulating emotions. These groupings help teams talk about needs and barriers, but they\'re not neat boxes:',
          'People may have more than one disability.',
          'Disability can be permanent, temporary, episodic, or situational.',
          'The same condition can affect two people differently depending on context, fatigue, stress, supports, and the environment.',
          'In accessibility practice, the most important shift is to focus on barriers: what in the environment or product blocks participation, and what design choices can remove those blocks.'
        ]
      },
      {
        heading: 'Visual disabilities',
        content: 'Visual disabilities include a wide range of experiences, from complete blindness to partial vision, reduced sharpness, and difficulty distinguishing certain colors. Some people primarily need non-visual access. Others rely on magnification, contrast adjustments, or stable layouts.',
        subsections: [
          {
            heading: 'Common subtypes and characteristics',
            content: [
              'Blindness: May range from no functional vision to limited perception of light/shapes. Reading print or recognizing faces visually may not be possible.',
              'Low vision: Vision that can\'t be fully corrected and affects daily tasks. People may need magnification, clearer contrast, and layouts that remain usable when zoomed.',
              'Color vision differences: Difficulty telling certain colors apart (often red/green). Meaning conveyed only through color can be missed.'
            ]
          },
          {
            heading: 'Common barriers',
            content: [
              'Physical and service environments: Information posted only visually with no equivalent alternative; poor lighting or glare; obstacles in walking paths; signs and controls that can\'t be felt or identified without sight.',
              'Digital products and content: Images, buttons, and controls that don\'t have meaningful text equivalents; interfaces that break when zoomed; missing structure and orientation cues; video without alternative access to visual information; low contrast text or reliance on color alone; experiences unreliable without a mouse.'
            ]
          },
          {
            heading: 'Practical accessibility solutions',
            content: [
              'Physical environment: Make routes predictable and free of hazards; use tactile and non-visual cues where appropriate; provide readable, discoverable labeling.',
              'Digital environment: Provide text equivalents for meaningful non-text content; ensure zoom and resizing don\'t hide content; use strong contrast and avoid color-only communication; keep navigation consistent and predictable.'
            ]
          }
        ]
      },
      {
        heading: 'Auditory disabilities',
        content: 'Auditory disabilities range from partial hearing loss to little or no functional hearing. Some people primarily use spoken language with amplification or clarity supports. Others primarily use sign language. Communication preferences can depend on whether hearing loss is present from birth or acquired later.',
        subsections: [
          {
            heading: 'Common subtypes and characteristics',
            content: [
              'Deafness: Little to no functional hearing. Sign language may be a primary language for many people, which can shape comfort with written language.',
              'Hard of hearing: Partial hearing that may be supported by amplification and environmental adjustments.',
              'Auditory processing differences: Hearing sensitivity may be typical, but understanding speech—especially in noise or fast-paced conversation—may be difficult.'
            ]
          },
          {
            heading: 'Common barriers',
            content: [
              'In-person communication: Speakers not using microphones in large rooms; lack of sign language interpretation; background noise and poor acoustics; group discussions where it\'s hard to track multiple speakers; poor lighting that makes lip-reading difficult.',
              'Digital products and media: Audio-only content without a text alternative; video without accurate captions or transcripts; players and meeting tools that don\'t support caption customization; experiences that require voice input as the only way to complete tasks.'
            ]
          },
          {
            heading: 'Practical accessibility solutions',
            content: [
              'Communication and events: Offer captions and transcripts for recorded and live content; provide interpretation where appropriate; improve room acoustics; use facilitation practices that support turn-taking and speaker identification.',
              'Digital: Provide high-quality captions and text alternatives; ensure media tools allow users to control audio and caption presentation; don\'t make audio the only channel for critical information.'
            ]
          }
        ]
      },
      {
        heading: 'Deaf-blindness',
        content: 'Deaf-blindness involves combined hearing and vision limitations. Many people have some usable hearing or vision, but the combination still creates unique access needs. Touch-based communication methods can be central.',
        subsections: [
          {
            heading: 'Common characteristics',
            content: [
              'Access to information often depends on tactile or highly structured alternatives.',
              'Communication may involve tactile forms of signing or braille-based approaches.',
              'Small gaps in content quality (like missing structure or inaccurate transcripts) can become complete blockers.'
            ]
          },
          {
            heading: 'Common barriers',
            content: [
              'Printed materials and wayfinding that have no tactile-accessible equivalent.',
              'Digital content that does not produce reliable, structured output for non-visual access methods.',
              'Audio/video without transcripts that can be converted into accessible formats.',
              'Lack of access to tactile interpretation when needed.'
            ]
          },
          {
            heading: 'Practical accessibility solutions',
            content: [
              'Ensure text-based versions of information exist for audio/video content.',
              'Prioritize clean structure and completeness in digital content so alternatives can work reliably.',
              'Plan communication access in advance rather than improvising in the moment.'
            ]
          }
        ]
      },
      {
        heading: 'Speech and language disabilities',
        content: 'Speech and language are related but different. Language is about understanding and expressing ideas through words and symbols (including reading and writing). Speech is about physically producing sounds and words. A person may have speech that is hard to understand while their language comprehension is strong—or vice versa.',
        subsections: [
          {
            heading: 'Common subtypes and characteristics',
            content: [
              'Speech sound differences: Ranges from mild slurring to severe difficulty producing speech.',
              'Motor-planning or muscle-control impacts: Speech may be slow, inconsistent, or difficult to coordinate.',
              'No functional speech (mutism): Can have neurological causes, psychological causes, or a combination.',
              'Aphasia: Language impairment due to brain-related causes; can affect speaking, understanding, reading, and writing.'
            ]
          },
          {
            heading: 'Common barriers',
            content: [
              'Communication systems that assume fast, fluent speech.',
              'Interactions that don\'t allow time to compose, type, or use alternative methods.',
              'Lack of patience or misunderstanding from staff, peers, or service providers.',
              'No non-speech option for essential tasks (customer support, authentication, meetings, kiosks).'
            ]
          },
          {
            heading: 'Practical accessibility solutions',
            content: [
              'Offer multiple communication channels (spoken, typed, visual, asynchronous).',
              'Allow extra time for responses without penalizing the person.',
              'Use respectful interaction practices: don\'t interrupt, don\'t finish sentences, confirm understanding.',
              'Provide clear, simple communication paths and avoid unnecessary complexity.'
            ]
          }
        ]
      },
      {
        heading: 'Mobility, flexibility, and body-structure disabilities',
        content: 'This category includes disabilities that affect purposeful movement, reach, strength, balance, endurance, posture, and fine motor control. Impacts can be permanent, temporary (like injury), or episodic (like fluctuating fatigue).',
        subsections: [
          {
            heading: 'Common subtypes and characteristics',
            content: [
              'Fine motor / dexterity limitations: Difficulty with small precise movements (buttons, zippers, tight grips, typing).',
              'Ambulation limitations: Walking may be difficult or unsafe; distance and terrain matter.',
              'Fatigue and reduced stamina: Energy limits can affect what\'s possible, even when strength is present.',
              'Body size or shape-related barriers: Equipment and spaces may not accommodate varied stature, proportions, or joint mobility.'
            ]
          },
          {
            heading: 'Common barriers',
            content: [
              'Physical environment: Narrow routes, tight aisles, heavy doors, and steps without equivalent entry routes; controls placed out of reach; seating, tables, kiosks, and equipment designed for a narrow "standard body"; social barriers such as stigma and discrimination.',
              'Digital products: Small tap targets or tightly packed controls that require precision; interactions that assume mouse-only or keyboard-only control with no flexibility; time-limited tasks that don\'t account for slower or alternative input.'
            ]
          },
          {
            heading: 'Practical accessibility solutions',
            content: [
              'Physical: Provide step-free access, adequate width, and clear paths; design reach ranges and controls for varied postures and mobility; use handles and controls that don\'t demand tight grip strength; offer spaces and furniture that accommodate different bodies comfortably and safely.',
              'Digital: Increase target sizes and spacing; reduce precision demands; ensure multiple input methods can complete tasks; avoid punishing time constraints; provide ways to extend time or resume.'
            ]
          }
        ]
      },
      {
        heading: 'Cognitive disabilities',
        content: [
          'Cognitive disabilities affect one or more mental functions such as attention, memory, language processing, perception, reasoning, planning, emotional regulation, or calculation. Just as importantly, cognitive performance is strongly influenced by context—stress, sleep, noise, time pressure, and information overload can make tasks much harder for anyone, and disproportionately harder for some people.',
          'A key idea: it\'s often more useful to design for supporting functions (like memory or attention) than for specific diagnoses.'
        ],
        subsections: [
          {
            heading: 'Examples of cognitive-related conditions and characteristics',
            content: [
              'Intellectual disability: Differences in reasoning/learning and in everyday adaptive skills (conceptual, social, practical).',
              'Reading-related disabilities (including dyslexia): Difficulty processing written language, decoding, spelling, or reading fluently.',
              'Math-related disabilities (including dyscalculia): Difficulty understanding quantities, math facts, mental calculation, or numeric reasoning.',
              'ADHD: Patterns of inattention and/or impulsivity/hyperactivity that can affect task initiation, organization, and sustained focus.',
              'Autism: Differences in social communication and patterns of repetitive behavior or routines; may include sensory sensitivities.',
              'Nonverbal learning profiles: Strong verbal skills paired with difficulty in social interpretation, transitions, abstract reasoning, or "big picture" synthesis.'
            ]
          },
          {
            heading: 'Common barriers (especially in digital experiences)',
            content: [
              'Hard-to-find information and unclear page purpose.',
              'Complex forms and multi-step processes.',
              'Password and account management burdens.',
              'Controls that are confusing, inconsistent, or overloaded with options.',
              'Distracting layouts, clutter, and dense walls of text.',
              'Timeouts that create stress and interrupt planning and completion.',
              'These barriers also affect people without cognitive disabilities—just usually less severely. The difference is often whether someone can push through, or is forced to abandon the task.'
            ]
          },
          {
            heading: 'Practical accessibility solutions',
            content: [
              'General communication and work/learning contexts: Use plain language and predictable structure; provide clear steps, examples, and feedback loops; reduce unnecessary noise and distraction; allow preparation time and avoid avoidable time pressure.',
              'Physical environments: Make key destinations easy to locate with simple routes and clear cues; provide signage that is large, legible, and unambiguous; use straightforward wayfinding with consistent patterns.',
              'Digital: Simplify content and interaction flows; reduce distractions and help users focus on what matters; offer information in more than one mode when helpful; make timing flexible and support personalization.'
            ]
          }
        ]
      },
      {
        heading: 'Seizure disabilities',
        content: 'Seizure disabilities involve seizure conditions that interfere with daily activities and safety. Seizures vary widely in how they present, from brief episodes to loss of consciousness. Some people have seizures triggered by visual stimuli such as flashing lights or certain patterns.',
        subsections: [
          {
            heading: 'Common characteristics',
            content: [
              'Symptoms can include changes in awareness, movement, sensation, or perception.',
              'Triggers can vary by person; some are sensitive to specific flash rates or high-contrast moving patterns.'
            ]
          },
          {
            heading: 'Common barriers',
            content: [
              'Activities or environments where a sudden seizure could cause serious injury.',
              'Digital content with flashing, flickering, or rapidly changing visuals.',
              'Media experiences without ways to pause, stop, or reduce motion and flashing.'
            ]
          },
          {
            heading: 'Practical accessibility solutions',
            content: [
              'Avoid unsafe flashing patterns and keep motion and visual effects within safe thresholds.',
              'Provide user controls to pause, stop, or reduce animation and video effects.',
              'Design visual experiences to prioritize stability, predictability, and user control.'
            ]
          }
        ]
      },
      {
        heading: 'Psychological disabilities',
        content: [
          'Psychological disabilities include mental health conditions that affect mood, perception, thinking, and behavior. They may be episodic or long-term, and their impact can change with stress, environment, and access to support.',
          'Examples include anxiety disorders, mood disorders (such as depression or bipolar disorder), and psychotic disorders (such as schizophrenia). These conditions can also involve cognitive impacts like difficulty concentrating, processing information, or making decisions—especially during episodes.'
        ],
        subsections: [
          {
            heading: 'Common barriers',
            content: [
              'Limited access to affordable, appropriate mental healthcare.',
              'Misdiagnosis or lack of knowledgeable support.',
              'Social stigma and discrimination.',
              'Educational and workplace environments that don\'t support fluctuating needs.',
              'Systems that add unnecessary cognitive load, stress, and time pressure.'
            ]
          },
          {
            heading: 'Practical accessibility solutions',
            content: [
              'Many strategies that support cognitive accessibility also help here:',
              'Reduce unnecessary complexity and information overload.',
              'Provide predictable processes and clear expectations.',
              'Allow flexibility, pacing, and supportive feedback.',
              'Design interactions that reduce stress (clear errors, gentle recovery paths, fewer punitive timeouts).'
            ]
          }
        ]
      },
      {
        heading: 'Multiple or complex disabilities',
        content: 'Multiple/complex disabilities refers to living with more than one disability at the same time—physical, sensory, cognitive, psychological, or a combination. Needs can\'t be assumed from any single category, and interactions between disabilities can create unique barriers.',
        subsections: [
          {
            heading: 'Common characteristics',
            content: [
              'Support needs are often broader and may involve overlapping impacts on communication, mobility, sensory processing, learning, and daily activities. In some settings (like education), this label is used for people with higher support needs.'
            ]
          },
          {
            heading: 'Common barriers',
            content: [
              'Systems designed for "single-issue" accommodations that don\'t work well in combination.',
              'Environments that require switching strategies frequently (which can be exhausting).',
              'Services that fragment support rather than coordinating it.'
            ]
          },
          {
            heading: 'Practical accessibility solutions',
            content: [
              'Treat accessibility as flexible and layered: offer multiple ways to perceive, operate, and understand.',
              'Avoid one-path designs; build redundancy and choice into interactions.',
              'Focus on individualized needs and remove barriers across environments, not just within a single channel.'
            ]
          }
        ]
      }
    ]
  },
  'assistive-technologies': {
    topicId: 'assistive-technologies',
    introduction: [
      'Assistive technologies and adaptive strategies are two complementary ways people navigate barriers in the physical world and in digital spaces. Assistive technology refers to tools—ranging from simple low-tech items to advanced software and devices—that help someone complete tasks that would otherwise be difficult or impossible. Adaptive strategies are the practical adjustments people make in how they do things: changing their environment, changing their approach, or using built-in settings and workarounds to get the same outcome in a different way.',
      'This topic matters because accessibility work sits at the intersection of people, environments, and tools. Even when a product or space is well designed, people will still use a mix of personal technology, personalization settings, and situational strategies to meet their needs. Understanding what these tools and strategies look like helps you design systems that work well with them—rather than accidentally blocking, undermining, or ignoring how people actually operate.'
    ],
    learningPoints: [
      'Distinguish between assistive technology, adaptive strategies, and built-in accessibility features',
      'Identify when barriers should be removed through design rather than "pushed onto" the individual',
      'Explain how people combine tools, settings, and environmental adjustments to complete tasks',
      'Recognize that assistive solutions can be low-tech, high-tech, personal, and situational',
      'Anticipate compatibility needs between assistive tools and digital products or physical environments'
    ],
    sections: [
      {
        heading: 'Key terms and the relationship between them',
        content: 'Understanding the distinctions between assistive technology, adaptive strategies, and accessibility solutions helps clarify where responsibility sits and how different approaches work together.',
        subsections: [
          {
            heading: 'Assistive technology',
            content: [
              'Assistive technology is any product, device, system, or item that helps a person perform tasks they could not do (or could not do reliably) without that support. The category includes:',
              'High-tech tools, like software that reads content aloud or devices that translate digital text into another output.',
              'Low-tech tools, like a paper-based communication board or a simple physical aid.',
              'General-purpose tools used in an assistive way, like a phone using built-in accessibility settings.',
              'A useful way to think about assistive technology is: it provides capability, access, or independence by changing how information is presented, how input is performed, or how tasks are completed.'
            ]
          },
          {
            heading: 'Adaptive strategies',
            content: [
              'Adaptive strategies are the "how" people adjust their behavior or environment to accomplish tasks. They often involve:',
              'Changing position or context (for example, moving closer to a speaker).',
              'Altering timing or pacing (taking more time, breaking a task into steps).',
              'Personalizing presentation (adjusting text size, contrast, layout, audio levels).',
              'Choosing different interaction methods (typing instead of speaking, using shortcuts, avoiding tasks in noisy environments).',
              'Adaptive strategies are especially important because they reflect real life: people constantly adapt to circumstances, fatigue, stress, lighting, noise, time pressure, and changing symptoms.'
            ]
          },
          {
            heading: 'Accessibility solutions',
            content: [
              'Accessibility solutions are changes to products, services, and environments that remove barriers at the source. This matters because assistive tech and adaptive strategies should not be the only path to participation. When the environment is built well, people need fewer workarounds and experience less friction.',
              'A critical point: the responsibility for accessibility sits with the provider/owner of the product, service, or space—not with the person who has to navigate it.'
            ]
          }
        ]
      },
      {
        heading: 'Assistive technology can be digital, physical, or both',
        content: [
          'It\'s common to associate assistive technology with computers, but the scope is broader:',
          'Some assistive tools are computer-based (software and settings).',
          'Some are physical-world tools (mobility aids, tactile labels, communication boards).',
          'Many experiences blend both (a device in the physical world that relies on digital content, or vice versa).',
          'This is important because people rarely use one tool in isolation. They often rely on a stack:',
          'a device,',
          'plus an app or software feature,',
          'plus compatible content structure,',
          'plus an environment that doesn\'t interfere.'
        ]
      },
      {
        heading: 'Assistive tech often depends on "user agents" and interoperability',
        content: [
          'Some assistive technologies rely on other systems to function properly—for example, software or devices that interpret the structure and content provided by a browser, media player, or app. When a digital product is built with weak semantics, missing labels, unpredictable navigation, or custom controls that don\'t expose meaningful information, assistive technologies may not have the data they need to work.',
          'Practically, this means accessibility is not just about having assistive tools available—it\'s about ensuring compatibility:',
          'controls need programmatic names and roles,',
          'content needs meaningful structure,',
          'interactions need to work without narrow input assumptions.'
        ]
      },
      {
        heading: 'Low-tech and "ordinary" tools still count',
        content: [
          'Not all assistive technology is expensive, clinical, or specialized. A cardboard communication board is a good example of an assistive tool that can be effective precisely because it is:',
          'simple,',
          'durable,',
          'easy to understand,',
          'usable without power or connectivity.',
          'Likewise, many supports that people use day-to-day can be considered assistive depending on context:',
          'built-in device settings,',
          'mainstream apps used to scaffold memory or attention,',
          'simple physical modifications and labels.',
          'The boundary is less about what the tool is and more about what it enables.'
        ]
      },
      {
        heading: 'Different definitions exist depending on context',
        content: [
          'The term "assistive technology" is used differently in different systems:',
          'In some contexts, it refers specifically to tools provided through public programs or social support systems.',
          'In other contexts, it includes anything that helps—including off-the-shelf consumer products and free tools.',
          'When communicating about assistive tech in professional work, it helps to clarify which meaning you\'re using, because it affects procurement, eligibility, support expectations, and access to funding.'
        ]
      },
      {
        heading: 'Adaptive strategies are personal, situational, and often invisible',
        content: [
          'Adaptive strategies are frequently the "in-between layer" that outsiders miss. They can look small, but they are often the difference between success and failure in a task.',
          'Examples of adaptive strategies in practice include:',
          'changing where someone sits to improve hearing or reduce distractions,',
          'slowing down and working in shorter bursts to manage fatigue,',
          'turning on a distraction-free mode to reduce cognitive load,',
          'using personalization settings to make text readable and navigation predictable.',
          'These strategies remind us that disability is not static. People\'s capacity shifts across the day and across environments, and good design supports those fluctuations rather than punishing them.'
        ]
      },
      {
        heading: 'How this connects back to design and implementation',
        content: [
          'Understanding assistive technologies and adaptive strategies changes how you design:',
          'You become more careful about not breaking compatibility (custom controls, missing labels, inaccessible media).',
          'You design with multiple ways to complete tasks, because people use different input/output methods.',
          'You respect the fact that people may be combining tools and strategies—so your design should be resilient, not fragile.',
          'You recognize that the best outcome is often removing the barrier in the product or environment, so assistive tools are a choice—not a requirement.'
        ]
      }
    ]
  }
}
