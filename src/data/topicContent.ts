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
      'Disability can be understood in many different ways, depending on the lens you use. Theoretical models of disability are frameworks that help explain what disability is, where barriers come from, and what kinds of responses society tends to prioritize. No single model captures the full reality of disabled people\'s lives. Each one highlights certain aspects while leaving others in the background.',
      'In real-world accessibility work, these models shape decisions about design, policy, healthcare, education, employment, and technology. Understanding them makes it easier to recognize why some solutions focus on "fixing" individuals, while others focus on changing environments, systems, or attitudes. Most organizations and practitioners do not rely on a single model, but instead blend ideas—often combining medical, social, and practical approaches—to respond more effectively to complex human needs.'
    ],
    learningPoints: [
      'Recognize different ways disability is framed in policy, design, and everyday decisions',
      'Understand why certain accessibility approaches prioritize environments while others prioritize individuals',
      'Identify the strengths and blind spots of common disability perspectives',
      'Apply different models to real-life situations involving barriers and access',
      'Make more informed, balanced accessibility decisions'
    ],
    sections: [
      {
        heading: 'Medical model',
        content: [
          'The medical model approaches disability as something that exists within an individual\'s body or mind. From this perspective, disability is primarily the result of injury, illness, or a health condition. The focus is on diagnosis, treatment, rehabilitation, and, when possible, cure. Professionals such as doctors, therapists, and clinicians play a central role, and success is often measured by how closely a person can be brought toward typical physical or cognitive functioning.',
          'This model reflects an important reality: many people experience pain, fatigue, illness, or functional limitations that require medical care. Medication, surgery, therapy, and assistive devices can significantly improve quality of life. For many individuals, medical intervention is essential and non-negotiable.',
          'However, the medical model tends to frame disability as a personal problem rather than a shared societal responsibility. When disability is seen only as an individual deficit, barriers created by buildings, technologies, policies, or social attitudes can be overlooked. People may feel pressured to adapt themselves to environments that were never designed for them, rather than questioning why those environments are inaccessible in the first place. This can also lead to experiences of stigma, pity, or being treated as incapable beyond the specific impairment.'
        ]
      },
      {
        heading: 'Social model',
        content: [
          'The social model shifts attention away from individual bodies and toward the world people live in. In this view, disability arises not from an impairment itself, but from barriers created by society. Stairs become disabling when there is no ramp or elevator. Printed text becomes disabling when alternative formats are unavailable. Attitudes, assumptions, and rigid systems can be just as limiting as physical obstacles.',
          'This model emphasizes that disability is something people encounter, not something they inherently "have." When environments are designed inclusively, many limitations disappear or are significantly reduced. As a result, the social model strongly aligns with accessibility, inclusive design, and human rights perspectives. It encourages changes to laws, policies, infrastructure, technologies, and cultural norms so that a wide range of people can participate fully.',
          'At the same time, the social model can underplay the lived, physical, and psychological realities of impairment. Pain, fatigue, sensory overload, or chronic illness do not disappear simply because barriers are removed. Additionally, its strong emphasis on social change can place disability advocacy in direct conflict with other political or economic priorities, sometimes leading to resistance or polarization.'
        ]
      },
      {
        heading: 'Biopsychosocial model',
        content: [
          'The biopsychosocial model attempts to bridge the gap between medical and social perspectives. It recognizes that disability is shaped by an interaction between biological factors (such as health conditions), psychological factors (such as emotions, coping strategies, and mental health), and social factors (such as relationships, work conditions, economic resources, and accessibility of environments).',
          'Rather than asking only "What is wrong with the body?" or "What barriers exist in society?", this model asks how all these elements combine in a specific person\'s life. For example, two people with the same diagnosis may have very different experiences depending on their support systems, mental well-being, financial stability, and environment.',
          'This integrated approach is especially useful in rehabilitation and support planning, where both medical needs and participation in daily life must be considered. However, the model can be complex and difficult to apply consistently. There is also concern that blending perspectives may unintentionally minimize medical needs or make responsibilities unclear if not handled carefully.'
        ]
      },
      {
        heading: 'Economic model',
        content: [
          'The economic model views disability primarily through the lens of work and productivity. Disability is defined by the extent to which a person\'s impairment affects their ability to participate in paid employment and contribute economically. This model often informs decisions about income support, benefits, insurance, and workplace accommodations.',
          'One strength of this approach is that it acknowledges the real financial impacts disability can have, both for individuals and for society. It can justify economic support, job accommodations, or policy interventions aimed at reducing disadvantage in employment contexts.',
          'At the same time, tying disability status to economic productivity can be deeply limiting. People who do not meet strict legal or administrative definitions may be denied support, even when they face significant barriers. It can also reinforce stigma by categorizing disabled people as dependents or burdens, rather than as full participants with diverse contributions beyond paid labor.'
        ]
      },
      {
        heading: 'Functional solutions model',
        content: [
          'The functional solutions model takes a practical, problem-solving approach. It focuses on identifying specific functional challenges and developing tools, technologies, or methods to reduce or eliminate their impact. Rather than debating definitions of disability, this model asks: "What is getting in the way, and how can we fix it?"',
          'This perspective aligns closely with the day-to-day work of accessibility and design professionals. Screen readers, captions, ramps, alternative input devices, and flexible interfaces all fit naturally within this model. Its strength lies in its focus on tangible outcomes and real-world usability.',
          'However, when driven primarily by technology or profit, solutions can miss the mark. Tools may be expensive, impractical, or designed without meaningful input from disabled users. A narrow focus on technical fixes can also overlook social, political, or environmental changes that would address the root cause of a barrier more effectively.'
        ]
      },
      {
        heading: 'Social identity or cultural affiliation model',
        content: [
          'This model emphasizes disability as a source of identity, community, and shared culture. Rather than seeing disability as something to overcome, it recognizes that some groups form strong cultural bonds around shared experiences, language, and values. Deaf communities are often cited as a clear example, where sign language, history, and social norms create a rich cultural identity.',
          'For many people, this model offers pride, belonging, and mutual support. Disability is not framed as a deficit, but as a meaningful part of who someone is. This perspective challenges assumptions that all disabilities should be minimized or eliminated.',
          'At the same time, strong group identity can sometimes create boundaries. People who do not fully share the group\'s experiences, communication styles, or values may feel excluded. This model highlights the importance of respecting diversity within disability communities, not just between disabled and non-disabled people.'
        ]
      },
      {
        heading: 'Charity model',
        content: [
          'The charity model views disabled people as vulnerable and in need of help from others. Support is framed as generosity, goodwill, or compassion, often delivered through donations or voluntary assistance. This model has historically played a role in mobilizing resources and responding to immediate needs.',
          'While charitable action can be valuable in specific situations, this model often positions disabled people as passive recipients rather than active decision-makers. It can reinforce stereotypes of helplessness and dependency, and may prioritize short-term relief over long-term structural change. Many disabled people find this framing disempowering, especially when it replaces rights-based approaches with pity or moral obligation.'
        ]
      },
      {
        heading: 'Conclusion',
        content: [
          'Together, these models illustrate that disability is not a single, simple concept. Each framework influences how problems are defined and which solutions are considered legitimate. Accessibility work is strongest when it recognizes these perspectives, understands their limits, and intentionally chooses approaches that respect both individual experiences and shared responsibility.'
        ]
      },
      {
        heading: 'Key takeaways',
        content: '',
        subsections: [
          {
            heading: '',
            content: [
              '<strong>No single model</strong> of disability is fully correct or incorrect; each has <strong>strengths and limitations</strong>, which is why organizations often <strong>combine multiple models</strong> in practice.',
              'The two models most commonly used by organizations are the <strong>medical and social models</strong>, often <strong>applied together</strong> to balance individual health needs with environmental responsibility.',
              'The <strong>medical model</strong> frames disability as an <strong>individual problem</strong> caused by disease or impairment, emphasizing <strong>cure, treatment, or medical management</strong>.',
              'A major <strong>weakness</strong> of the medical model is its tendency to <strong>stigmatize</strong>, often making people with disabilities feel <strong>pressured to fit norms</strong> or viewed as globally incapacitated.',
              'The <strong>social model</strong> defines disability as a result of <strong>societal barriers</strong>, such as inaccessible environments, exclusionary policies, or negative attitudes, <strong>rather than individual impairment</strong>.',
              'The social model strongly aligns with <strong>accessibility and universal design</strong>, treating equal access as a <strong>human rights issue</strong> and focusing on <strong>removing barriers</strong>.',
              'The <strong>biopsychosocial model</strong> was first conceptualized in <strong>1977 by George Engel</strong>, integrating <strong>biological, psychological, and social factors</strong>.',
              'In <strong>2002</strong>, the <strong>World Health Organization</strong> published the <strong>International Classification of Functioning, Disability and Health (ICF)</strong>.',
              'The <strong>ICF</strong> describes disability as a <strong>complex interaction</strong> of health, personal, and environmental factors, explicitly <strong>integrating medical and social models</strong>.',
              'The biopsychosocial model is especially <strong>valuable in rehabilitation</strong> contexts, but its <strong>complexity</strong> (as seen in the ICF) can make implementation challenging and raise concerns about <strong>downplaying medical needs</strong>.'
            ]
          }
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
          'Disability categories are often grouped by the kinds of activities that are affected—like seeing, hearing, speaking, moving, concentrating, processing information, or regulating emotions. These groupings help teams talk about needs and barriers, but they\'re not neat boxes:'
        ],
        subsections: [
          {
            heading: '',
            content: [
              'People may have more than one disability.',
              'Disability can be permanent, temporary, episodic, or situational.',
              'The same condition can affect two people differently depending on context, fatigue, stress, supports, and the environment.'
            ]
          }
        ]
      },
      {
        heading: '',
        content: 'In accessibility practice, the most important shift is to focus on barriers: what in the environment or product blocks participation, and what design choices can remove those blocks.'
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
  },
  'accommodations-universal-design': {
    topicId: 'accommodations-universal-design',
    introduction: [
      'Universal design is an approach to creating products, services, and environments so they can be used by as many people as possible, from the outset, without requiring special adjustments. Instead of treating access as an afterthought or an exception, universal design treats human diversity as a normal condition of use. This perspective is especially important in accessibility work because it shifts effort upstream—into design decisions—rather than relying primarily on fixes later.',
      'This topic also sits at the intersection of accessibility and usability. While these concepts are closely related, they are not identical. Understanding how they overlap and where they differ helps teams choose the right strategies, avoid false trade-offs, and recognize when universal design can reduce the need for individual accommodations—while still respecting that accommodations and assistive technologies will sometimes remain necessary.'
    ],
    learningPoints: [
      'Understand how universal design differs from accommodations and why both still matter',
      'Recognize the relationship between accessibility, usability, and universal design',
      'Explain why designing for diversity benefits everyone, not only disabled users',
      'Apply universal design thinking earlier in design and decision-making processes'
    ],
    sections: [
      {
        heading: 'Universal Design and Accommodations',
        content: [
          'At its core, universal design aims to create solutions that work for the widest possible range of people without requiring individual changes. A universally designed product or service anticipates variation in ability, age, language, experience, and context of use. Instead of asking users to adapt themselves, the design adapts to them.',
          'Accommodations work differently. They are targeted adjustments made for a specific person or situation to ensure equal access. Examples include providing a sign language interpreter for a meeting, offering extra time on a test, or installing a screen reader on a particular workstation. Accommodations are often essential, especially in existing systems that were not designed inclusively.',
          'Universal design does not eliminate the need for accommodations or assistive technologies. Rather, it reduces how often they are required. When environments and products are designed to be flexible and inclusive from the beginning, fewer people need special arrangements or personal assistance just to participate. This can reduce cost, effort, and stigma, while still leaving room for individualized support when it is genuinely needed.'
        ]
      },
      {
        heading: 'Related Design Concepts',
        content: [
          'The idea behind universal design has influenced several closely related approaches. These concepts often overlap in practice and share a common goal: making things usable by as many people as possible without special adaptation.',
          'Inclusive design emphasizes designing with, not just for, people who have diverse needs. It often highlights the importance of involving users with disabilities and other marginalized groups directly in the design process.',
          'Design for all is a term commonly used in Europe, particularly in policy and standards contexts. It reflects the same underlying philosophy as universal design and is often applied at an organizational or societal level, guiding how products and services are developed across entire systems.',
          'Human-centered design focuses on understanding users\' needs, behaviors, and contexts. While it does not always explicitly address disability, it can strongly support universal design when it intentionally includes people with a wide range of abilities and experiences.',
          'Life-span design emphasizes that people\'s abilities change over time. A design that works well for children, adults, and older people is more likely to be resilient, flexible, and inclusive overall.',
          'Despite differences in terminology, all of these approaches share the same central idea: designing for diversity from the start rather than retrofitting solutions later.'
        ]
      },
      {
        heading: 'Accessibility, Usability, and Universal Design',
        content: [
          'Universal design is closely connected to both accessibility and usability, but each concept has a distinct emphasis.',
          'Accessibility focuses on ensuring that people with disabilities can use a product, service, or environment without barriers or discrimination. It is concerned with equivalent access and comparable experiences, and it often addresses specific requirements related to sensory, physical, cognitive, or communication differences.',
          'Usability focuses on how easy and efficient something is to use. It considers factors like clarity, efficiency, error prevention, and user satisfaction. However, usability work does not automatically account for disability unless it is explicitly included in research and testing.',
          'Universal design sits alongside these concepts by aiming for broad inclusion without defining narrow target groups. Rather than designing separately for "typical users" and "edge cases," universal design treats variation as expected. When done well, universal design supports accessibility goals and often improves usability for everyone.',
          'Together, these concepts reinforce one another. Accessibility ensures fairness and inclusion, usability ensures ease and effectiveness, and universal design provides a mindset for addressing both early and holistically.'
        ]
      }
    ]
  },
  'benefits-accessibility': {
    topicId: 'benefits-accessibility',
    introduction: [
      'Accessibility is about removing barriers so people can participate fully in everyday life. When environments, products, services, and technologies are accessible, people with disabilities can take part in education, work, social activities, and civic life on more equal terms. This participation is not just a matter of convenience—it directly affects independence, dignity, health, and overall quality of life.',
      'The impact of accessibility extends far beyond individuals. Families, organizations, and society as a whole benefit when more people can contribute their skills, creativity, and perspectives. Inclusive access leads to stronger communities, more resilient organizations, and economic gains, while exclusion carries real social and financial costs. Accessibility is therefore not only a disability issue, but a shared societal investment.'
    ],
    learningPoints: [
      'Recognize how accessibility supports people with different types of disabilities',
      'Understand why accessibility improves independence and participation',
      'Explain how inclusion benefits organizations, communities, and economies',
      'Connect accessibility with innovation, diversity, and long-term sustainability'
    ],
    sections: [
      {
        heading: 'How Accessibility Benefits People with Disabilities',
        content: [
          'Accessibility makes it possible for people with disabilities to participate in major life activities that many people take for granted. In education, accessible learning materials, flexible teaching methods, and supportive environments allow students with diverse abilities to learn, demonstrate knowledge, and progress alongside their peers. Without these supports, capable learners may be excluded or underperform simply because systems are not designed for them.',
          'In employment, accessibility enables people to apply for jobs, perform essential tasks, collaborate with colleagues, and advance in their careers. Accessible workplaces—both physical and digital—reduce unnecessary dependence on others and allow individuals to focus on their skills and contributions rather than on navigating barriers. This increased independence often leads to better mental health, confidence, and economic stability.',
          'Accessibility also supports social participation and well-being. Being able to communicate, travel, access information, and take part in cultural or recreational activities is closely tied to health and happiness. When barriers are removed, people are more likely to build relationships, engage in their communities, and maintain a sense of belonging.',
          'Importantly, accessibility benefits people across a wide range of disabilities, including sensory, physical, cognitive, and psychological disabilities. It also supports people with temporary impairments, age-related changes, chronic conditions, or situational limitations. In this way, accessibility reflects the reality that human ability is variable and changes over time.'
        ]
      },
      {
        heading: 'How Accessibility Benefits Families and Communities',
        content: [
          'When people with disabilities can act more independently, families often experience reduced stress and caregiving burden. Accessible environments mean that family members are less likely to need to step in as intermediaries, advocates, or constant sources of assistance. This allows relationships to be more balanced and focused on connection rather than logistics.',
          'Communities benefit when more people can participate in social, cultural, and civic life. Inclusive access leads to broader representation in public spaces, decision-making processes, and community activities. This diversity strengthens social cohesion and helps ensure that community solutions reflect a wider range of lived experiences.',
          'Accessibility improvements made for disabled people often end up helping many others as well. Clear signage, step-free access, captions, flexible technologies, and intuitive design make spaces and services easier to use for parents with strollers, older adults, people with limited literacy, non-native language speakers, and people using mobile devices in challenging environments.'
        ]
      },
      {
        heading: 'How Accessibility Benefits Organizations',
        content: [
          'Organizations that prioritize accessibility gain access to a wider talent pool. By removing barriers in recruitment, onboarding, and daily work, employers can hire and retain skilled employees who might otherwise be excluded. This not only improves equity, but also strengthens teams through diverse perspectives and problem-solving approaches.',
          'Inclusive organizations often see gains in innovation and creativity. People who navigate barriers regularly tend to develop strong adaptability and problem-solving skills. When these perspectives are included, teams are better equipped to identify risks, design flexible solutions, and respond to complex challenges.',
          'Accessibility also improves overall quality. Products and services designed to be accessible are often clearer, more robust, and more user-friendly for everyone. This can reduce errors, support customer satisfaction, and lower long-term costs related to redesign, support, or legal risk.'
        ]
      },
      {
        heading: 'Societal and Economic Benefits of Accessibility',
        content: [
          'At a broader level, accessibility contributes to economic participation and growth. When people with disabilities are excluded from education and employment, societies lose out on productivity, innovation, and tax contributions, while often increasing reliance on social support systems. Research shows that this exclusion can result in significant losses to national and global economies.',
          'By contrast, inclusive societies benefit from higher workforce participation, reduced poverty, and more sustainable social systems. Accessibility supports the idea that people with disabilities are not a cost to society, but contributors whose potential is realized when barriers are removed.',
          'In this sense, accessibility is not only a moral or legal consideration—it is a practical strategy for building healthier, more inclusive, and more prosperous societies.'
        ]
      }
    ]
  },
  'wcag-principles': {
    topicId: 'wcag-principles',
    introduction: [
      'Web accessibility is about making sure websites and applications can be used by as many people as possible, including people with disabilities. It focuses on whether users can perceive information, understand it, navigate interfaces, interact with controls, and contribute content in meaningful ways. Accessibility is not limited to a small group of users—it reflects the reality that people use the web in many different ways, with different devices, abilities, and contexts.',
      'The Web Content Accessibility Guidelines (WCAG) provide a shared framework for achieving this goal. Developed by the World Wide Web Consortium through its Web Accessibility Initiative, WCAG brings together technical standards and universal design thinking. While the guidelines are often used to support compliance, their deeper purpose is to make digital content more usable, resilient, and inclusive for everyone.'
    ],
    learningPoints: [
      'Understand what web accessibility means in practical, real-world terms',
      'Recognize how WCAG supports people with different types of disabilities',
      'Learn the four core principles that structure accessible web design',
      'Apply accessibility thinking across design, development, and content creation'
    ],
    sections: [
      {
        heading: 'What Web Accessibility Means',
        content: [
          'Web accessibility means that people can use websites, tools, and applications regardless of disability. This includes being able to take in information, understand how things work, move through content, interact with controls, and create or submit information when needed.',
          'Disabilities that affect web access include auditory, visual, physical, speech, cognitive, and neurological disabilities. Each of these can influence how someone uses a website—for example, whether they rely on a keyboard instead of a mouse, need captions instead of audio, require clear structure and language, or use assistive technologies such as screen readers.',
          'Importantly, accessible design also benefits many people without disabilities. People using mobile devices, people in noisy or brightly lit environments, older adults with changing abilities, people with temporary injuries, and people with slow or limited internet connections all benefit from clearer structure, flexible interaction, and well-designed content. In this sense, web accessibility reflects inclusive and resilient design, not special treatment.'
        ]
      },
      {
        heading: 'The Role of WCAG 2.2',
        content: [
          'The Web Content Accessibility Guidelines (WCAG) provide recommendations for making web content accessible. WCAG 2.2 builds on earlier versions and continues to emphasize that accessibility and usability are closely connected. Content that meets these guidelines is often easier to use, more consistent, and more adaptable across devices and technologies.',
          'WCAG is organized around four high-level principles. These principles describe what must be true for content to be accessible, regardless of the specific technology being used. Under each principle are guidelines that address common accessibility challenges and patterns.'
        ]
      },
      {
        heading: 'Perceivable',
        content: [
          'The perceivable principle is about making sure users can take in the information being presented. Content must not rely on a single sense, such as sight or hearing, to be understood.',
          'This includes providing text alternatives for images and other non-text content, so information can be conveyed through screen readers or other assistive technologies. Multimedia content should have alternatives such as captions or transcripts so that audio and visual information is available in more than one form.',
          'Perceivable content is also flexible. It can be presented in different ways—such as enlarged text, high contrast, or alternative layouts—without losing meaning. This supports people with low vision, color vision differences, or those who need to customize how content appears in order to understand it.'
        ]
      },
      {
        heading: 'Operable',
        content: [
          'The operable principle focuses on interaction. Users must be able to navigate and use all functionality, regardless of how they interact with the web.',
          'This includes ensuring that everything can be done using a keyboard, since not everyone can use a mouse or touch interface. Users should also have enough time to read content and complete tasks, without being rushed by unexpected time limits.',
          'Operable design avoids content that can trigger seizures or physical reactions and supports clear navigation so users can find their way through a site. It also recognizes that people may use different input methods, such as voice control, switches, or touch, and aims to make interaction flexible and forgiving.'
        ]
      },
      {
        heading: 'Understandable',
        content: [
          'The understandable principle is about clarity and predictability. Content should be written and structured in a way that users can comprehend and learn from.',
          'Text should be readable and appropriate for its audience, avoiding unnecessary complexity. Interfaces should behave in consistent and predictable ways so users are not surprised by unexpected changes in context or functionality.',
          'Understandable design also helps users avoid mistakes and recover from them when they occur. Clear instructions, helpful error messages, and guidance during form completion all reduce cognitive load and frustration, particularly for people with cognitive or learning disabilities.'
        ]
      },
      {
        heading: 'Robust',
        content: [
          'The robust principle ensures that content works reliably with a wide range of user tools, both now and in the future.',
          'This means using clean, well-structured code that can be interpreted correctly by browsers, assistive technologies, and other user agents. When content is robust, it is more likely to remain accessible as technologies evolve and new tools emerge.',
          'Robust design supports long-term accessibility. It recognizes that users rely on a diverse ecosystem of technologies and that accessibility should not break when software updates, devices change, or new interaction methods are introduced.',
          'Together, these four principles—perceivable, operable, understandable, and robust—form the foundation of modern web accessibility. They provide a shared language for designers, developers, and content creators to build digital experiences that are inclusive, usable, and sustainable.'
        ]
      }
    ]
  },
  'built-environment': {
    topicId: 'built-environment',
    introduction: [
      'Accessibility in the built environment is about ensuring that physical spaces—such as buildings, streets, public areas, and transportation systems—can be used safely, independently, and with dignity by as many people as possible. This includes people with disabilities, older adults, children, and anyone whose abilities vary due to context, health, or life stage. As populations age and disability becomes more common, accessible design is not a niche concern but a core requirement of good planning and construction.',
      'Universal design has its roots in the physical world and continues to be a guiding framework for built environments. Rather than treating accessibility as a set of add-ons or exceptions, universal design encourages designers and planners to consider human diversity from the very beginning. Doing so leads to spaces that work better for everyone and avoids costly retrofits later. While building regulations often focus on minimum legal requirements, universal design aims higher—toward environments that are genuinely inclusive, usable, and welcoming.'
    ],
    learningPoints: [
      'Understand core principles of physical accessibility in buildings and public spaces',
      'Recognize how universal design applies to the built environment',
      'Distinguish between minimum compliance and best-practice inclusive design',
      'Identify key areas where physical accessibility affects daily life and safety'
    ],
    sections: [
      {
        heading: 'The Purpose of Accessibility in Physical Spaces',
        content: [
          'The built environment shapes how people move, interact, and participate in society. If buildings or public spaces are inaccessible, people may be excluded from education, employment, healthcare, transportation, and social life—regardless of their skills or motivation.',
          'Accessible physical design supports independence and safety. Features such as step-free entrances, clear signage, adequate lighting, and accessible restrooms allow people to navigate spaces without relying on assistance. These features are essential for people with mobility, sensory, or cognitive disabilities, but they also benefit others, including parents with strollers, travelers with luggage, delivery workers, and older adults.',
          'Accessibility is also closely linked to safety. Many requirements around entrances, exits, and circulation are tied to emergency evacuation and wayfinding. When accessibility is overlooked, people with disabilities may be placed at greater risk during emergencies or be unable to evacuate safely.'
        ]
      },
      {
        heading: 'Universal Design in the Built Environment',
        content: [
          'Universal design principles were first developed with physical spaces in mind. The core idea is to design environments that can be used by the widest possible range of people without the need for special adaptation.',
          'Applying universal design in the built environment means considering diversity early—during planning and design, not after construction. This includes thinking about how people enter a space, move through it, understand it, and use its facilities. When universal design is integrated from the start, it often reduces long-term costs by avoiding later modifications, which can be expensive and disruptive.',
          'Universal design does not replace accommodations. Some people will still require specific supports or assistive devices. However, well-designed spaces reduce how often individual accommodations are needed and make them easier to provide when they are necessary.'
        ]
      },
      {
        heading: 'Minimum Standards vs. Best Practice',
        content: [
          'Accessibility rules and regulations for the built environment vary widely across countries and regions. Most places have mandatory building codes or standards that set minimum requirements for accessibility. These requirements are often focused on compliance—meeting specific measurements or features to avoid discrimination.',
          'Minimum standards are important, but they often reflect an accommodation mindset. They may address only a limited set of needs or apply only to certain users. As a result, a building can technically comply with regulations while still being difficult or uncomfortable for many people to use.',
          'Best-practice universal design guidelines aim beyond compliance. They encourage designers and builders to consider a broader range of abilities, preferences, and use cases. These guidelines are often included in policy frameworks or design recommendations and support higher-quality, more inclusive outcomes.'
        ]
      },
      {
        heading: 'Key Areas of Focus in the Built Environment',
        content: [
          'Accessibility in physical spaces spans many interconnected areas, each of which affects how people experience and use environments.',
          'Access in and out of buildings: This includes entrances, exits, thresholds, and emergency evacuation routes. Step-free access, automatic doors, clear escape routes, and accessible alarms are critical for safety and independence.',
          'Movement within buildings: Once inside, people need to be able to move comfortably and safely. This includes accessible corridors, elevators, stairways, seating, restrooms, and workspaces. Wayfinding, signage, and lighting play a major role in helping people orient themselves and understand where to go.',
          'Transportation and outdoor environments: Accessibility extends beyond individual buildings to sidewalks, crossings, parking areas, and public transport systems. Continuous accessible routes, curb cuts, tactile surfaces, and accessible vehicles are essential for connecting people to services and opportunities.',
          'Integration with broader policies: Built environment accessibility is often embedded within wider policies related to housing, urban planning, transportation, and public infrastructure. When accessibility is treated as a core value across these systems, inclusion becomes more consistent and sustainable.',
          'Accessibility and universal design in the built environment are about more than meeting rules. They are about creating spaces where people can move freely, participate fully, and feel that they belong. When physical environments are designed with diversity in mind, they support not only disabled people, but the well-being and resilience of society as a whole.'
        ]
      }
    ]
  },
  'universal-design-principles': {
    topicId: 'universal-design-principles',
    introduction: [
      'Universal design is grounded in the idea that environments, products, and services should work well for everyone, without needing special adaptation or separate solutions. The seven principles of universal design provide a practical framework for translating this idea into real design decisions. They describe what "good design for human diversity" looks like in practice and help designers evaluate whether something truly supports a wide range of users.',
      'These principles were developed in 1997 by an interdisciplinary working group led by Ronald Mace at North Carolina State University. They were originally rooted in the built environment, but they now influence design across architecture, products, digital interfaces, services, and systems. The principles emphasize that universal design is not about designing for a niche group—it is about creating solutions that are usable, dignified, and beneficial for everyone.'
    ],
    learningPoints: [
      'Name and recognize the seven principles of universal design',
      'Understand the goals behind universal design as a design philosophy',
      'Apply universal design principles to physical and digital environments',
      'Explain why universal design benefits both individuals and society'
    ],
    sections: [
      {
        heading: 'The Goals and Benefits of Universal Design',
        content: [
          'The goal of universal design is to ensure that environments and products can be accessed, understood, and used by as many people as possible, regardless of age, size, ability, or disability. This approach treats human variation as normal rather than exceptional. When design accounts for this diversity from the start, it reduces barriers, increases independence, and improves overall user experience.',
          'Universal design benefits extend beyond people with disabilities. Designs that are clear, flexible, safe, and comfortable tend to be easier for everyone to use. They reduce the need for special instructions, individual accommodations, or retrofits. As a result, universal design often leads to better quality, lower long-term costs, and solutions that feel more intuitive and humane.'
        ]
      },
      {
        heading: 'The Seven Principles of Universal Design',
        content: [],
        subsections: [
          {
            heading: '1. Equitable Use',
            content: [
              'Equitable use means that a design can be used by people with diverse abilities in comparable ways. Whenever possible, everyone should be able to use the same solution rather than being separated into "standard" and "special" options.',
              'Designs that follow this principle avoid stigma and segregation. They ensure that features related to privacy, safety, and security are equally available to all users. Equitable designs are also appealing and respectful, reinforcing the idea that inclusion is a core design value rather than an accommodation.'
            ]
          },
          {
            heading: '2. Flexibility in Use',
            content: [
              'Flexibility in use acknowledges that people have different preferences, abilities, and ways of interacting with the world. A flexible design provides choices in how something can be used.',
              'This includes supporting different handedness, interaction styles, and speeds of use. Flexible designs allow people to work at their own pace and choose methods that suit them best, which is especially important for people with motor, cognitive, or sensory differences—but useful for everyone.'
            ]
          },
          {
            heading: '3. Simple and Intuitive Use',
            content: [
              'Simple and intuitive use focuses on clarity. A design should be easy to understand, regardless of the user\'s experience level, language skills, or concentration.',
              'This principle encourages removing unnecessary complexity, aligning with user expectations, and organizing information so that the most important elements are easy to find. Clear feedback and guidance during tasks help users feel confident and reduce frustration or errors.'
            ]
          },
          {
            heading: '4. Perceptible Information',
            content: [
              'Perceptible information ensures that essential information is communicated effectively, even when users have sensory limitations or are in challenging environments.',
              'This principle emphasizes presenting information in multiple ways—such as visual, verbal, and tactile—so it does not rely on a single sense. It also highlights the importance of contrast, legibility, and clear differentiation between elements, making it easier for users to understand and follow instructions.'
            ]
          },
          {
            heading: '5. Tolerance for Error',
            content: [
              'Tolerance for error recognizes that mistakes happen. Designs should minimize the risk and consequences of accidental actions.',
              'This includes arranging elements to reduce hazards, providing clear warnings, and incorporating fail-safe features that prevent serious harm. Designs that discourage unconscious or risky actions help protect users and make systems more forgiving and humane.'
            ]
          },
          {
            heading: '6. Low Physical Effort',
            content: [
              'Low physical effort means that a design can be used comfortably and efficiently without unnecessary strain.',
              'Users should be able to maintain neutral body positions, apply reasonable force, and avoid repetitive or sustained effort. This principle is particularly important for people with limited strength, stamina, or mobility, but it also improves comfort and usability for everyone.'
            ]
          },
          {
            heading: '7. Size and Space for Approach and Use',
            content: [
              'This principle focuses on ensuring that people can approach, reach, and use a design regardless of their body size, posture, or mobility.',
              'It includes providing clear lines of sight, adequate space, and comfortable reach ranges for both seated and standing users. Designs should also allow room for assistive devices and accommodate variations in hand and grip size, supporting independence and ease of use.',
              'Together, the seven principles of universal design offer a practical, values-driven framework for inclusive design. They help designers move beyond minimum compliance and toward solutions that are usable, respectful, and beneficial for the widest possible range of people.'
            ]
          }
        ]
      }
    ]
  },
  'udl-ux': {
    topicId: 'udl-ux',
    introduction: [
      'Universal Design for Learning (UDL) is an instructional framework that helps educators design learning experiences that work for a wide range of learners from the beginning. Rather than assuming a single "average" learner, UDL is based on cognitive science and recognizes that people vary in how they engage with material, how they understand information, and how they demonstrate what they know. The core idea is flexibility: providing multiple ways to access learning, stay motivated, and show understanding.',
      'Alongside UDL, concepts such as usability, user experience (UX), and user-centered design shape how products, services, and learning environments are created. These ideas emphasize ease of use, satisfaction, trust, and effectiveness. Accessibility is a foundational part of this picture, ensuring that people with disabilities can participate fully. Together, UDL, usability, and UX support inclusive experiences that are not only accessible, but also effective and meaningful.'
    ],
    learningPoints: [
      'Understand the core concepts and goals of Universal Design for Learning',
      'Identify and explain the three UDL guidelines and why they matter',
      'Recognize the kinds of options instructors should provide for learners',
      'Understand how usability and user experience relate to accessibility',
      'Explain how user-centered design supports inclusive outcomes'
    ],
    sections: [
      {
        heading: 'Universal Design for Learning (UDL)',
        content: [
          'Universal Design for Learning is a framework for designing instruction that anticipates learner diversity. It emphasizes that variability is the norm, not the exception. Learners differ in motivation, background knowledge, sensory abilities, language, culture, attention, and executive functioning. UDL responds to this reality by encouraging instructors to build flexibility into learning goals, materials, methods, and assessments.',
          'The UDL framework was developed and is maintained by Center for Applied Special Technology. It is grounded in research on how people learn and how learning is affected by emotion, perception, and action. Instead of retrofitting instruction for individual students, UDL aims to reduce barriers at the design stage so more learners can succeed without needing special arrangements.'
        ]
      },
      {
        heading: 'The Three UDL Guidelines',
        content: [
          'The UDL framework is organized around three high-level guidelines. These are sometimes described as the why, what, and how of learning.'
        ],
        subsections: [
          {
            heading: 'Engagement — The Why of Learning',
            content: [
              'Engagement focuses on motivation and emotional involvement in learning. Learners differ widely in what captures their interest, what sustains their effort, and how they respond to challenge. Some thrive on novelty and collaboration, while others prefer routine or independent work.',
              'To support engagement, instructors should provide options that:',
              'Spark and sustain learners\' interest',
              'Help learners persist through effort and challenges',
              'Support self-regulation, including managing emotions, stress, and motivation',
              'By offering choices and supportive structures, engagement becomes more inclusive and responsive to individual needs.'
            ]
          },
          {
            heading: 'Representation — The What of Learning',
            content: [
              'Representation addresses how information is presented and understood. Learners vary in how they perceive and process information. Sensory disabilities, learning differences, language backgrounds, and prior knowledge all influence comprehension.',
              'To support representation, instructors should provide options that:',
              'Present information through multiple sensory modalities (such as text, audio, visuals, and demonstrations)',
              'Clarify language, symbols, and key concepts',
              'Support comprehension through structure, scaffolding, and connections between ideas',
              'Using multiple representations helps learners build stronger understanding and transfer knowledge more effectively.'
            ]
          },
          {
            heading: 'Action and Expression — The How of Learning',
            content: [
              'Action and expression focus on how learners interact with materials and show what they know. Learners differ in physical abilities, communication styles, and executive functioning skills such as planning and organization.',
              'To support action and expression, instructors should provide options that:',
              'Make interaction with tools and environments physically accessible',
              'Allow different ways to communicate understanding (such as writing, speaking, visual work, or projects)',
              'Support executive functions through guidance, practice, and scaffolding',
              'Offering flexible ways to act and express knowledge helps learners demonstrate their strengths rather than being limited by a single format.'
            ]
          }
        ]
      },
      {
        heading: 'Usability and User Experience (UX)',
        content: [
          'Usability and user experience are closely related but distinct concepts. Usability focuses on whether something is easy to learn, easy to use, and effective for accomplishing tasks. A usable system allows users to achieve their goals efficiently and with minimal confusion.',
          'User experience is broader. It includes usability, but also encompasses how people feel about a product or service over time. UX includes first impressions, trust, satisfaction, emotional response, and the overall quality of interactions across the entire lifecycle of use.',
          'Accessibility is a core component of good UX. If a product cannot be used by people with disabilities, the experience is incomplete. At the same time, usability alone is not enough to guarantee a positive experience—content quality, visual design, interaction design, and credibility all play important roles.'
        ]
      },
      {
        heading: 'User-Centered Design',
        content: [
          'User-centered design is an approach that places users at the heart of the design and development process. Its goal is to ensure that products and services genuinely meet users\' needs rather than forcing users to adapt to poorly designed systems.',
          'Key elements of user-centered design include:',
          'Involving users early and throughout the design process through research and testing',
          'Using iterative cycles of design, feedback, and refinement',
          'Including accessibility considerations and testing as part of regular design practice',
          'When user-centered design includes people with diverse abilities, it naturally supports accessibility, usability, and better user experiences overall.',
          'Universal Design for Learning, usability, and user experience all share a common goal: creating experiences that work for real people in real contexts. By designing with flexibility, clarity, and inclusion in mind, educators and designers can reduce barriers, support diverse needs, and create environments where more people can learn, use, and succeed.'
        ]
      }
    ]
  },
  'international-conventions': {
    topicId: 'international-conventions',
    introduction: [
      'People with disabilities make up a significant portion of the global population, yet for much of modern history their rights were not explicitly protected in international human rights law. Early human rights instruments focused on universal rights in principle, but often failed to address disability directly or to recognize the specific barriers disabled people face in exercising those rights. Over time, this gap became increasingly visible as disability advocates emphasized that equal rights on paper do not guarantee equal access in practice.',
      'International declarations and conventions now play a crucial role in protecting the rights of people with disabilities. Together, they establish disability as a human rights issue rather than a matter of charity or medical treatment alone. These instruments influence national laws, guide public policy, and provide a shared framework for advancing accessibility, non-discrimination, and full participation in society.'
    ],
    learningPoints: [
      'Identify the most important international human rights instruments related to disability',
      'Understand how disability rights fit within broader human rights frameworks',
      'Explain the purpose and impact of the Convention on the Rights of Persons with Disabilities',
      'Recognize why accessibility is treated as a fundamental human rights issue'
    ],
    sections: [
      {
        heading: 'Disability and International Human Rights',
        content: [
          'International human rights law operates at multiple levels. Some instruments declare fundamental rights that apply to everyone, including people with disabilities. Others prohibit discrimination, either by explicitly naming disability or by covering it under broader categories such as "other status." A smaller number focus directly and specifically on the rights of people with disabilities.',
          'Historically, disability was often addressed indirectly or not at all. For example, people with disabilities were not explicitly named as a protected group in early global human rights documents. Over time, it became clear that without explicit recognition, disabled people remained excluded from education, employment, public life, and access to services—even when general human rights protections existed.',
          'This realization led to the development of disability-specific instruments that clarify how universal rights apply to people with disabilities and what states must do to remove barriers and prevent discrimination.'
        ]
      },
      {
        heading: 'The Universal Declaration of Human Rights (UDHR)',
        content: [
          'The United Nations adopted the Universal Declaration of Human Rights in 1948 as a foundational statement of human rights. It was the first global document to set out civil, political, economic, social, and cultural rights intended to apply to all people everywhere.',
          'The UDHR does not mention disability explicitly. However, it establishes the principle that all human beings are entitled to rights and freedoms without discrimination. Because of this, it serves as the moral and legal foundation for later treaties, including those that explicitly address disability.',
          'In the context of disability rights, the UDHR matters because it frames accessibility, equality, and participation as universal concerns. Later disability-specific conventions build on this foundation by clarifying how these rights must be realized for people with disabilities in practice.'
        ]
      },
      {
        heading: 'Convention on the Rights of Persons with Disabilities (CRPD)',
        content: [
          'The Convention on the Rights of Persons with Disabilities represents a major shift in how disability is understood in international law. Adopted by the United Nations in 2006, it was developed in response to the absence of a legally binding treaty that explicitly protected the rights of people with disabilities.',
          'The CRPD moves away from viewing disabled people as objects of charity or medical care. Instead, it recognizes them as rights-holders who can make decisions about their own lives and participate fully in society. The Convention adopts a broad understanding of disability and affirms that all people with disabilities—regardless of type—are entitled to the full range of human rights.',
          'A key feature of the CRPD is that it is legally binding for countries that ratify it. States are not only expected to recognize rights, but also to take concrete steps to implement them. This includes changing laws, policies, and practices that create or maintain barriers.',
          'Accessibility is a central concept within the CRPD. It is listed as a general principle and addressed in detail, particularly in relation to the physical environment, transportation, information and communication, and public services. The Convention makes clear that without accessibility, people with disabilities cannot exercise their rights on an equal basis with others.',
          'The CRPD also establishes an international monitoring process. States must report on their progress, and organizations representing people with disabilities can contribute independent input. This reinforces accountability and ensures that disabled people\'s voices are part of evaluating how rights are implemented.'
        ]
      },
      {
        heading: 'The Marrakesh Treaty',
        content: [
          'The Marrakesh Treaty addresses a specific but critical barrier faced by people with print disabilities: access to books and other published materials. It was adopted in 2013 under the administration of the World Intellectual Property Organization.',
          'Before the Treaty, copyright law was a major obstacle to producing and sharing accessible formats such as braille, large print, or audio. As a result, people who are blind, visually impaired, or otherwise print disabled experienced a severe shortage of accessible reading materials—a situation often described as a "book famine."',
          'The Marrakesh Treaty creates mandatory copyright exceptions that allow accessible versions of published works to be made and shared without requiring permission from copyright holders. It also allows these materials to be exchanged across borders, expanding access globally.',
          'While narrower in scope than the CRPD, the Marrakesh Treaty is a powerful example of how international law can remove structural barriers and directly support accessibility, education, and cultural participation.'
        ]
      },
      {
        heading: 'Why These Instruments Matter',
        content: [
          'Together, these declarations and conventions establish disability rights as an integral part of human rights. The UDHR provides the universal foundation, the CRPD clarifies how rights apply to people with disabilities and makes them enforceable, and the Marrakesh Treaty addresses a concrete accessibility barrier affecting access to knowledge.',
          'For accessibility professionals, designers, educators, and policymakers, these instruments provide more than legal context. They articulate a shared global understanding that accessibility is not optional, charitable, or secondary—it is a prerequisite for equality, dignity, and full participation in society.'
        ]
      }
    ]
  },
  'regional-instruments': {
    topicId: 'regional-instruments',
    introduction: [
      'Regional human rights instruments—such as charters, conventions, and protocols—play a crucial role in protecting and advancing the rights of people with disabilities. While global frameworks establish broad principles, regional instruments often reflect shared histories, legal traditions, and social realities. They can strengthen protections, fill gaps left by international law, and provide enforcement mechanisms that are closer and more accessible to individuals.',
      'Many regional instruments were created before the global disability rights treaty emerged. Even today, they remain highly relevant. Regional systems allow individuals and organizations to bring complaints before regional courts and commissions, creating accountability and practical pathways for enforcement. Together with global agreements, these instruments form a layered human rights framework that supports disability rights at international, regional, and national levels.'
    ],
    learningPoints: [
      'Identify key regional human rights instruments related to disability',
      'Understand how regional frameworks complement global disability rights law',
      'Explain the main purpose of each major regional instrument',
      'Recognize the role of regional courts and monitoring bodies in enforcement'
    ],
    sections: [
      {
        heading: 'Why Regional Instruments Matter',
        content: [
          'Regional human rights instruments serve several important functions. They often interpret human rights in ways that reflect regional priorities, such as economic development, social inclusion, or post-conflict realities. They can also move faster than global systems in responding to emerging issues or strengthening enforcement.',
          'Another critical role of regional instruments is access to justice. Many allow individuals or organizations to bring cases before regional human rights bodies, such as courts or commissions. These mechanisms can lead to binding judgments, policy changes, or increased pressure on governments to uphold rights.',
          'In disability rights, regional instruments have helped clarify non-discrimination, social participation, accessibility, and inclusion—sometimes even before these ideas were firmly established at the global level.'
        ]
      },
      {
        heading: 'The EU Charter of Fundamental Rights and Related European Instruments',
        content: [
          'Europe has a layered human rights system built over decades. The European Union adopted the Charter of Fundamental Rights to bring clarity and consistency to rights protections across its Member States.',
          'The Charter draws on earlier European treaties, including the European Convention on Human Rights and the European Social Charter. Together, these instruments protect civil, political, economic, and social rights. While disability was not always explicitly named in earlier treaties, protections against discrimination apply broadly and have been used to address disability-related cases.',
          'The Charter became legally binding in 2009 and explicitly addresses disability in two important ways. It prohibits discrimination on the basis of disability and affirms the right of people with disabilities to independence, social and occupational integration, and participation in community life. This makes disability rights a core part of EU law and policy.'
        ]
      },
      {
        heading: 'The African Charter on Human and Peoples\' Rights and the African Disability Rights Protocol',
        content: [
          'The African Union adopted the African Charter on Human and Peoples\' Rights in 1981. The Charter recognizes a broad range of rights and emphasizes collective as well as individual responsibilities. Although disability is not explicitly named in its non-discrimination provisions, the Charter has been interpreted to protect people with disabilities under general equality principles.',
          'To strengthen disability-specific protections, the African Union later adopted the African Disability Rights Protocol. This protocol builds on global disability rights principles while addressing regional concerns, such as armed conflict, forced displacement, and harmful traditional practices that disproportionately affect people with disabilities.',
          'The protocol adds detailed obligations for states, including measures to combat stigma, violence, and harmful practices. Although it has faced delays in reaching full legal force, it represents a significant step toward regionally grounded disability rights protection in Africa.'
        ]
      },
      {
        heading: 'The Inter-American Convention on the Elimination of All Forms of Discrimination Against Persons with Disabilities',
        content: [
          'In the Americas, the Organization of American States adopted a landmark disability rights treaty in 1999. This convention was the first binding regional instrument to explicitly prohibit discrimination against people with disabilities.',
          'Its primary goal is to prevent and eliminate discrimination and to promote full social integration. The convention addresses accessibility directly, calling on states to remove barriers in areas such as transportation, communication, housing, education, employment, and public services.',
          'By requiring both the elimination of existing barriers and the design of new environments that are accessible, the convention links non-discrimination with practical accessibility measures. It also allows disability rights issues to be raised before regional human rights bodies, strengthening enforcement.'
        ]
      },
      {
        heading: 'Regional Instruments in the Broader Human Rights Framework',
        content: [
          'Regional human rights instruments do not replace global agreements—they complement them. They reinforce universal principles while tailoring protections to regional contexts. In some cases, they provide stronger monitoring, clearer obligations, or more accessible enforcement mechanisms.',
          'For disability rights, this layered approach is especially important. Barriers are often shaped by local infrastructure, cultural practices, and regional economic conditions. Regional instruments help ensure that human rights protections are not abstract, but responsive to real-world conditions.',
          'Together, regional and global frameworks affirm that disability rights are human rights—and that accessibility, equality, and inclusion must be protected at every level of governance.'
        ]
      }
    ]
  },
  'national-provincial': {
    topicId: 'national-provincial',
    introduction: [
      'National and provincial disability rights laws translate human rights principles into enforceable obligations within specific countries or regions. These laws shape how equality, accessibility, and inclusion are implemented in everyday life—across employment, education, transportation, public services, and the built and digital environments. While international and regional treaties set shared expectations, it is national and provincial legislation that most directly affects people\'s lived experiences.',
      'Over the past few decades, disability-related laws have increasingly shifted away from charity and welfare models toward equality and anti-discrimination frameworks. This change reflects a broader move from viewing disability as an individual problem to recognizing it as a social issue shaped by barriers, exclusion, and unequal treatment. As a result, modern disability laws tend to emphasize rights, participation, and systemic change rather than assistance alone.'
    ],
    learningPoints: [
      'Identify key national and provincial disability rights laws',
      'Understand how disability laws reflect equality and non-discrimination principles',
      'Explain the main purpose and scope of major disability-related acts',
      'Recognize how accessibility and reasonable accommodation are used in law'
    ],
    sections: [
      {
        heading: 'Background: How Disability Laws Have Evolved',
        content: [
          'Since the 1990s, many countries have adopted civil rights–based disability legislation. These laws were influenced by disability activism, shifts toward the social model of disability, and growing recognition that exclusion and segregation constitute discrimination.',
          'Earlier disability policies often focused on welfare benefits or social security. While these supports remain important, they did not address systemic barriers or unequal treatment. Modern disability rights laws aim to remove discrimination and require institutions—such as governments, employers, schools, and service providers—to take responsibility for inclusion.',
          'Another major influence on national laws has been the global disability rights treaty adopted by the United Nations in the 2000s. This treaty encouraged countries to align their domestic laws with a rights-based approach and to recognize accessibility as a precondition for equality.'
        ]
      },
      {
        heading: 'Accessibility and Reasonable Accommodation in Law',
        content: [
          'Most disability rights laws rely on two complementary approaches: accessibility and reasonable accommodation.',
          'Accessibility focuses on creating environments, services, and systems that are usable by everyone, regardless of disability status. Accessibility requirements apply broadly and proactively. For example, digital services or public buildings may be required to meet specific accessibility standards so that people do not have to request special treatment.',
          'Reasonable accommodation addresses individual needs in specific situations. It requires adjustments or modifications—such as flexible work arrangements, assistive technology, or alternative formats—so that a person with a disability can participate equally. Accommodation is typically required unless it would impose an undue or disproportionate burden.',
          'Together, these approaches reflect the idea that equality requires both inclusive design and individual flexibility.'
        ]
      },
      {
        heading: 'The Equality Act 2010 (United Kingdom)',
        content: [
          'The Equality Act 2010 consolidated and strengthened earlier UK anti-discrimination laws. It applies across England, Scotland, and Wales and protects people from discrimination in employment, education, housing, transport, and access to goods and services.',
          'Disability is listed as a protected characteristic under the Act. The law prohibits several forms of discrimination, including direct discrimination, indirect discrimination, and unfavorable treatment arising from disability. It also places duties on employers, service providers, and public bodies to consider equality in their decision-making.',
          'The Act includes specific provisions related to accessibility, transport, education, and employment practices, such as limiting when employers may ask about disability and requiring adjustments for disabled students. Its overall purpose is to promote fairness, inclusion, and equal participation in society.'
        ]
      },
      {
        heading: 'The Americans with Disabilities Act of 1990 (United States)',
        content: [
          'The Americans with Disabilities Act of 1990, commonly known as the ADA, is a landmark civil rights law in the United States. It guarantees equal opportunity for people with disabilities in key areas such as employment, public accommodations, transportation, state and local government services, and telecommunications.',
          'The ADA explicitly recognizes that discrimination against people with disabilities is widespread and deeply rooted in social, physical, and institutional barriers. It frames disability discrimination as a civil rights issue, comparable to discrimination based on race, sex, or religion.',
          'A core goal of the ADA is to ensure full participation, independent living, and economic self-sufficiency. The law addresses both accessibility—such as requirements for public spaces and services—and reasonable accommodation, particularly in employment. It has had a significant influence on disability rights legislation globally.'
        ]
      },
      {
        heading: 'The Ontarians with Disabilities Act of 2001 (Canada)',
        content: [
          'The Ontarians with Disabilities Act 2001 reflects a provincial commitment to inclusion and equality in Canada. It recognizes the right of people with disabilities to participate fully in the social, economic, and cultural life of Ontario.',
          'The Act acknowledges that barriers exist across society and that these barriers are likely to increase as the population ages. It places responsibility for barrier removal and prevention across all sectors, including government, organizations, institutions, and individuals.',
          'Rather than focusing solely on individual complaints, the Act emphasizes systemic change. Its purpose is to prevent new barriers from being created and to identify and remove existing ones, reinforcing accessibility as a shared responsibility.'
        ]
      },
      {
        heading: 'Disability Laws Across the European Union',
        content: [
          'In the European Union, disability rights are shaped by both EU-level directives and national legislation. A key instrument is the Employment Equality Directive, adopted in 2000. This directive prohibits disability discrimination in employment and occupation and requires reasonable accommodation.',
          'All EU Member States have implemented the directive into national law, but broader disability equality laws vary widely. A proposed directive to extend equal treatment beyond employment has not been adopted, resulting in differences between countries in areas such as healthcare, education, and access to services.',
          'As a result, national approaches within the EU range from comprehensive anti-discrimination frameworks to more limited protections. This variation highlights how shared principles can be implemented differently depending on legal traditions and policy priorities.'
        ]
      },
      {
        heading: 'Why National and Provincial Laws Matter',
        content: [
          'National and provincial disability rights laws are where rights become enforceable. They determine whether people can challenge discrimination, access remedies, and expect accessible environments as a matter of law rather than goodwill.',
          'Although these laws differ in scope and detail, they share a common purpose: recognizing people with disabilities as rights-holders and requiring societies to remove barriers that prevent full participation. Together, they form a critical link between international human rights principles and everyday accessibility practice.'
        ]
      }
    ]
  },
  'procurement-laws': {
    topicId: 'procurement-laws',
    introduction: [
      'Domain-specific accessibility laws focus on particular technologies, industries, or activities where barriers have been especially persistent or where access is essential for participation in modern life. Rather than applying broadly across society, these laws target sectors such as communications, transportation, media, digital identity, and public procurement. Their purpose is to ensure that accessibility is built into systems that people rely on daily for information, mobility, work, safety, and civic participation.',
      'These laws often emerge where general anti-discrimination frameworks are not specific enough to address technical complexity or rapidly changing technologies. By setting targeted obligations, domain-specific laws clarify responsibilities, establish accessibility as a baseline requirement, and help ensure that innovation does not leave people with disabilities behind.'
    ],
    learningPoints: [
      'Identify major domain-specific accessibility laws across sectors',
      'Understand why certain industries require tailored accessibility rules',
      'Explain the purpose and scope of each law',
      'Recognize how accessibility is enforced through sector-based regulation and procurement'
    ],
    sections: [
      {
        heading: 'Why Domain-Specific Laws Matter',
        content: [
          'General disability rights laws establish equality and non-discrimination, but they often leave practical details open to interpretation. In complex sectors like telecommunications, aviation, or digital services, accessibility depends on technical standards, coordinated infrastructure, and industry-wide practices.',
          'Domain-specific laws address this gap by:',
          'Updating older accessibility requirements to reflect modern technologies',
          'Setting clear expectations for industries with high public impact',
          'Embedding accessibility into safety-critical and rights-critical systems',
          'Ensuring consistency across markets and service providers',
          'These laws often work alongside broader disability rights legislation, reinforcing accessibility as a core requirement rather than an optional feature.'
        ]
      },
      {
        heading: 'Communications and Media Accessibility',
        content: [],
        subsections: [
          {
            heading: 'Twenty-First Century Communications and Video Accessibility Act (CVAA)',
            content: [
              'The Twenty-First Century Communications and Video Accessibility Act modernizes U.S. communications law to reflect digital, broadband, and mobile technologies. Its primary goal is to ensure that people with disabilities can access modern communication tools at the same time and in the same ways as everyone else.',
              'The CVAA extends accessibility requirements to technologies such as:',
              'Internet-based voice and video communication',
              'Video programming delivered via digital platforms',
              'User interfaces, menus, and controls on communication devices',
              'By updating earlier laws from the analog era, the CVAA ensures that accessibility keeps pace with innovation rather than lagging behind it.'
            ]
          },
          {
            heading: 'EU Audiovisual Media Services Directive (AVMSD)',
            content: [
              'The Audiovisual Media Services Directive regulates television broadcasting and on-demand audiovisual services across the European Union. It requires media services to become progressively more accessible to people with disabilities through proportionate measures.',
              'The directive focuses on:',
              'Increasing accessibility features such as captions, audio description, and sign language',
              'Ensuring emergency information delivered via audiovisual media is accessible',
              'Encouraging media providers to develop accessibility action plans',
              'Rather than imposing a single technical solution, the AVMSD promotes gradual improvement and accountability within the media sector.'
            ]
          }
        ]
      },
      {
        heading: 'Transportation Accessibility',
        content: [],
        subsections: [
          {
            heading: 'Air Carrier Access Act and Amendments (United States)',
            content: [
              'The Air Carrier Access Act, strengthened by the Air Carrier Access Amendments Act of 2017, prohibits discrimination on the basis of disability in air travel.',
              'These laws apply to:',
              'All U.S. airlines',
              'Flights to or from the United States operated by foreign airlines',
              'They define both passenger rights and airline obligations, covering areas such as boarding assistance, seating, mobility aids, communication, and aircraft design. The amendments emphasize that air travel accessibility must evolve alongside modern aircraft and employment demands.',
              'The US Department of Transportation enforces these requirements, making air travel accessibility a regulated and enforceable right rather than a courtesy.'
            ]
          }
        ]
      },
      {
        heading: 'Telecommunications and Emergency Access in the EU',
        content: [],
        subsections: [
          {
            heading: 'European Electronic Communications Code',
            content: [
              'The European Electronic Communications Code establishes rules for telecommunications services across Europe, with explicit attention to the needs of end-users with disabilities.',
              'Key accessibility goals include:',
              'Providing service information and contracts in accessible formats',
              'Ensuring equal access to emergency services and emergency communications',
              'Requiring accessible helplines, including missing children and child support services',
              'Supporting affordability and availability of assistive equipment and services',
              'This framework recognizes that communication access is essential for safety, autonomy, and participation in society.'
            ]
          }
        ]
      },
      {
        heading: 'Digital Identity and Trust Services',
        content: [],
        subsections: [
          {
            heading: 'eIDAS Regulation',
            content: [
              'The eIDAS Regulation governs electronic identification and trust services used for digital transactions within the European Union. It requires that electronic signatures, authentication tools, and related end-user products be accessible to people with disabilities.',
              'Because digital identity systems are increasingly required to access government services, banking, and cross-border transactions, accessibility in this domain is critical for equal participation in digital society.'
            ]
          }
        ]
      },
      {
        heading: 'Procurement Laws as Accessibility Tools',
        content: [
          'Procurement laws are a powerful mechanism for advancing accessibility. By embedding accessibility requirements into purchasing decisions, governments can influence entire markets and ensure that accessible design becomes the norm rather than the exception.'
        ],
        subsections: [
          {
            heading: 'EU Public Procurement Directives',
            content: [
              'The EU Public Procurement Directive requires that accessibility and design-for-all principles be considered when public authorities procure products and services intended for use by people.',
              'Key provisions include:',
              'Requiring accessibility criteria in technical specifications',
              'Allowing accessibility to be considered during tender evaluation',
              'Permitting exclusion of suppliers that violate accessibility obligations',
              'Requiring accessible electronic procurement processes',
              'Because these directives are implemented through national laws, they affect procurement practices across all EU Member States.'
            ]
          },
          {
            heading: 'US Federal Acquisition Regulation (FAR)',
            content: [
              'The US Federal Acquisition Regulation implements accessibility requirements for U.S. federal procurement, including those derived from Section 508 of the Rehabilitation Act.',
              'When acquiring ICT, federal agencies must ensure:',
              'Employees with disabilities have comparable access to information and data',
              'Members of the public with disabilities have equivalent access to digital services',
              'By tying accessibility to procurement, the FAR ensures that accessibility is addressed early—at the point where products and services are selected—rather than retrofitted later.'
            ]
          }
        ]
      },
      {
        heading: 'The Broader Impact of Domain-Specific Laws',
        content: [
          'Domain-specific accessibility laws demonstrate how accessibility can be embedded directly into the systems that shape daily life. By targeting communications, transportation, media, digital identity, and procurement, these laws address areas where exclusion has particularly high consequences.',
          'Together, they reinforce a critical principle: accessibility is not an add-on. In complex and essential domains, it is a fundamental requirement for equality, safety, and participation.'
        ]
      }
    ]
  },
  'ict-standards': {
    topicId: 'ict-standards',
    introduction: [
      'Information and Communication Technology (ICT) is now central to how people work, learn, shop, communicate, and access public services. Despite this, legal protections for digital accessibility developed later than protections for physical spaces. Many countries first focused on buildings, transportation, and employment, only later recognizing that inaccessible websites, apps, and digital services can be just as exclusionary.',
      'Today, ICT accessibility laws link civil rights principles with technical standards. They define who must make digital content accessible, what "accessible" means in practice, and how compliance is monitored or enforced. While approaches differ between regions, a common trend has emerged: access to digital information and services is increasingly treated as a legal and civil rights issue, not a voluntary best practice.'
    ],
    learningPoints: [
      'Identify major ICT accessibility laws and regulations in the US and EU',
      'Understand how accessibility standards like WCAG are used in law',
      'Recognize who is responsible for compliance in public and private sectors',
      'Explain how ICT accessibility laws are enforced in practice'
    ],
    sections: [
      {
        heading: 'ICT Accessibility and Civil Rights',
        content: [
          'ICT accessibility laws apply anti-discrimination principles to digital environments. They address barriers in websites, mobile applications, electronic documents, kiosks, and digital services. Because technology evolves rapidly, most laws rely on recognized technical standards rather than prescribing detailed technical rules directly in legislation.',
          'Enforcement mechanisms vary. Some systems rely on complaints and lawsuits, while others emphasize regulatory monitoring and corrective action. Public-sector obligations are often more explicit, while private-sector obligations are frequently enforced through broader non-discrimination law.'
        ]
      },
      {
        heading: 'ICT Accessibility Laws and Standards in the United States',
        content: [],
        subsections: [
          {
            heading: 'Section 508 of the Rehabilitation Act',
            content: [
              'Section 508 applies to federal government agencies in the United States. It requires that electronic and information technology used or procured by the federal government be accessible to both employees and members of the public with disabilities.',
              'Section 508 is proactive and procurement-focused. Accessibility must be considered when technology is designed, purchased, maintained, or updated. The technical requirements are defined in the Section 508 Standards, which are based on the Web Content Accessibility Guidelines (WCAG) 2.0.',
              'Enforcement mechanisms: Enforcement is primarily administrative. Individuals can file complaints with federal agencies, and agencies are responsible for investigating and resolving issues. Compliance is also driven through procurement rules, internal audits, and oversight rather than widespread litigation.'
            ]
          },
          {
            heading: 'The Americans with Disabilities Act (ADA) and Digital Accessibility',
            content: [
              'The Americans with Disabilities Act of 1990 does not specify technical accessibility standards for websites or mobile applications, especially for private businesses and non-profit organizations. However, courts and regulators have increasingly interpreted digital services as falling under the ADA\'s prohibition of disability discrimination.',
              'Title III of the ADA applies to places of public accommodation, which courts have found can include e-commerce platforms, organizational websites, and public-facing mobile apps. As a result, organizations can face legal action if their digital services are inaccessible.',
              'Enforcement mechanisms: The ADA is enforced by the US Department of Justice and, in education-related cases, by the US Department of Education Office for Civil Rights. Enforcement occurs through investigations, consent decrees, settlements, and private lawsuits. This complaint-driven model has led to a growing volume of accessibility litigation related to websites and apps.'
            ]
          }
        ]
      },
      {
        heading: 'ICT Accessibility Laws and Standards in the European Union',
        content: [],
        subsections: [
          {
            heading: 'European Web Accessibility Directive',
            content: [
              'The European Web Accessibility Directive applies to public sector bodies across the European Union. It requires government websites and mobile applications to be accessible when they are made available to users.',
              'In addition to technical accessibility, the Directive introduces procedural transparency. Public bodies must:',
              'Ensure websites and mobile apps are accessible',
              'Publish an accessibility statement',
              'Provide a mechanism for users to report accessibility issues',
              'Link to enforcement or redress procedures',
              'The Directive refers to EN 301 549 as the primary way to demonstrate compliance. Following the relevant parts of this harmonized standard creates a legal presumption of conformity.',
              'Enforcement mechanisms: Each EU Member State is responsible for monitoring and enforcing compliance. Enforcement typically involves national monitoring bodies, periodic audits, user feedback mechanisms, and corrective actions rather than individual lawsuits.'
            ]
          },
          {
            heading: 'European Accessibility Act',
            content: [
              'The European Accessibility Act significantly expands ICT accessibility requirements beyond the public sector. Applying from 2025, it establishes common accessibility rules for key products and services provided by private businesses, with limited exceptions for microenterprises.',
              'Covered ICT-related products and services include:',
              'Computers and operating systems',
              'Smartphones and telephony services',
              'ATMs, ticketing, and check-in machines',
              'E-books and e-commerce platforms',
              'Banking services and transport-related digital services',
              'Like the Web Accessibility Directive, the Act relies on harmonized European standards—such as updated versions of EN 301 549—to assess accessibility.',
              'Enforcement mechanisms: Enforcement is handled at the national level. Member States designate authorities responsible for oversight and penalties. The Act allows non-government organizations and other bodies to initiate legal action on behalf of individuals, and it permits penalties for non-compliance under national law.'
            ]
          }
        ]
      },
      {
        heading: 'Comparing Enforcement Approaches',
        content: [
          'ICT accessibility enforcement differs noticeably between the US and the EU:',
          'In the United States, enforcement relies heavily on complaints, investigations, and litigation, particularly under the ADA.',
          'In the European Union, enforcement emphasizes regulatory oversight, harmonized standards, and national monitoring bodies.',
          'Public-sector ICT accessibility is generally more explicitly regulated than private-sector accessibility.',
          'Despite these differences, both systems increasingly recognize that digital access is essential to equality and participation.',
          'Accessibility laws applied to ICT ensure that digital transformation does not create new forms of exclusion. By linking civil rights principles to technical standards and enforcement mechanisms, these laws make accessibility a concrete, enforceable requirement in the digital world.'
        ]
      }
    ]
  },
  'integrating-ict': {
    topicId: 'integrating-ict',
    introduction: [
      'Building accessible information and communication technology (ICT) across an organization is not a one-time effort or a standalone project. It requires an ongoing, coordinated program that is embedded into culture, governance, processes, and everyday decision-making. Organizations that succeed treat accessibility as part of how they design, procure, build, communicate, and evaluate digital products and services—over time and at scale.',
      'This topic brings together practical guidance for adopting an ICT accessibility program, explains how maturity models help organizations understand progress, and highlights why leadership and management champions are essential. The focus is not just on what to do, but on how to sustain accessibility as technology, standards, and organizational priorities evolve.'
    ],
    learningPoints: [
      'Describe the key steps involved in adopting an organization-wide ICT accessibility plan',
      'Understand why accessibility must be treated as an ongoing program, not a project',
      'Explain how accessibility maturity models support planning and measurement',
      'Recognize the critical role of leadership and management champions'
    ],
    sections: [
      {
        heading: 'Designing and Implementing an ICT Accessibility Program',
        content: [],
        subsections: [
          {
            heading: 'Accessibility as a Program, Not a Project',
            content: [
              'ICT accessibility must be approached strategically. A single website fix, audit, or remediation effort will not be sufficient if accessibility is not built into how the organization works. New content, new technologies, staff turnover, and evolving standards all mean that accessibility must be continuously maintained.',
              'A programmatic approach ensures that accessibility:',
              'Is aligned with organizational goals and culture',
              'Is integrated into policies, workflows, and governance',
              'Is supported with training, resources, and accountability',
              'Evolves as technology and legal expectations change'
            ]
          },
          {
            heading: 'Recommended Steps to Adopt an ICT Accessibility Plan',
            content: [
              'Initiate: A successful accessibility program begins with alignment and awareness. Accessibility needs to connect with existing organizational values, risk management, quality assurance, and inclusion goals.',
              'Key early actions include: Learning foundational accessibility concepts and standards, developing a clear business case for accessibility, understanding the current digital environment and risks, raising awareness across teams and leadership, setting measurable accessibility objectives, and building initial stakeholder support. This phase focuses on readiness and buy-in, not immediate technical fixes.',
              'Plan: Planning translates commitment into structure. It clarifies who is responsible, what resources are needed, and how progress will be tracked. Effective planning includes: creating an organizational accessibility policy, assigning clear roles and responsibilities, allocating budget and staffing resources, reviewing existing websites, systems, and tools, establishing monitoring and reporting frameworks, and engaging internal and external stakeholders. Without this foundation, accessibility efforts tend to be fragmented and short-lived.',
              'Implement: Implementation is where accessibility becomes part of everyday work. Rather than treating accessibility as an add-on, it should be woven into design, development, content creation, and procurement processes. Core implementation practices include: building staff skills and internal expertise, integrating accessibility into existing policies and workflows, assigning tasks and supporting delivery teams, evaluating early and regularly during development, prioritizing issues based on impact and risk, and tracking and communicating progress. Quick wins can help build momentum, but long-term success depends on consistency.',
              'Sustain: Sustainability ensures that accessibility does not fade once initial goals are met. Ongoing monitoring and adaptation are essential. Sustaining an accessibility program involves: continuously monitoring websites and digital services, maintaining engagement with stakeholders, tracking changes in standards, laws, and technologies, adapting practices as tools and platforms evolve, and incorporating user feedback, including from people with disabilities. Accessibility maturity grows over time through review, learning, and refinement.'
            ]
          },
          {
            heading: 'Organizational Guidelines for Accessible Information',
            content: [
              'Guidelines developed for accessible information emphasize embedding accessibility into strategy and operations, not isolating it within specialist roles.',
              'Key recommendations include: Including accessibility commitments in long-term strategy, developing a clear, incremental accessibility plan, assigning accountable owners with authority and resources, embedding accessibility into content production workflows, training all staff, with deeper training for specialists, ensuring accessibility requirements are included when outsourcing, and testing accessibility before publishing information or services.',
              'This approach treats accessibility as a shared responsibility across the organization.'
            ]
          }
        ]
      },
      {
        heading: 'Accessibility Maturity Models',
        content: [],
        subsections: [
          {
            heading: 'What Maturity Models Are',
            content: [
              'An accessibility maturity model is a structured way to assess how well accessibility is integrated into an organization. Instead of asking "Are we accessible?", maturity models ask "How consistently, predictably, and effectively do we address accessibility?"',
              'They help organizations: Benchmark current practices, identify gaps and priorities, measure improvement over time, and align accessibility with business processes.',
              'Different models exist, and organizations should choose one that fits their culture and scale.'
            ]
          },
          {
            heading: 'Example: Accessibility Maturity Levels',
            content: [
              'A common five-level structure includes:',
              'Informal: No consistent process or documentation',
              'Defined: Policies exist but are inconsistently applied',
              'Repeatable: Accessibility practices are consistently followed',
              'Managed: Processes are monitored, measured, and improved',
              'Best practice: Accessibility is optimized, innovative, and shared',
              'Progression through levels reflects increasing integration and organizational confidence.'
            ]
          },
          {
            heading: 'Adapted Capability Maturity Approach',
            content: [
              'Another approach adapts general process maturity models to ICT accessibility. It moves from ad hoc practices, to documented and enforced processes, to measurable and continuously improving systems. At higher levels, accessibility becomes part of organizational quality and risk management rather than a compliance afterthought.'
            ]
          }
        ]
      },
      {
        heading: 'The Importance of Management Champions',
        content: [],
        subsections: [
          {
            heading: 'Why Champions Matter',
            content: [
              'Leadership support is one of the strongest predictors of accessibility success. Management champions help move accessibility from intention to action.',
              'Effective accessibility champions: Build a shared vision and align teams, advocate for accessibility in decision-making, sustain momentum across projects and departments, support adoption of maturity models and metrics, and reinforce that accessibility is a program, not a side task.',
              'Champions do not need to be technical experts, but they must understand the value and implications of accessibility.'
            ]
          },
          {
            heading: 'Evaluating for Accessibility',
            content: [
              'Evaluation is essential to accessible ICT. Accessibility issues are easier and less costly to fix when identified early.',
              'Best practices include: Designing products to be usable by people with disabilities from the start, creating reusable accessible design and code libraries, using automated tools alongside human evaluation, testing throughout the lifecycle, not just at launch, including people with disabilities in evaluation activities, and using external expertise when internal capacity is limited.',
              'Regular evaluation keeps accessibility aligned with real user needs.'
            ]
          }
        ]
      },
      {
        heading: 'Supporting Accessibility Through People and Processes',
        content: [],
        subsections: [
          {
            heading: 'Recruiting and Hiring',
            content: [
              'Organizations strengthen accessibility by including people with disabilities as employees and by recruiting staff with accessibility skills. This includes accessible recruitment processes, reasonable accommodations, disability awareness training, and clear expectations for managers.'
            ]
          },
          {
            heading: 'Communication and Procurement',
            content: [
              'Accessible communication and purchasing practices extend accessibility beyond internal systems. Publishing accessible content, training communicators, setting procurement requirements, and verifying vendor claims all help ensure accessibility is maintained across the supply chain.'
            ]
          },
          {
            heading: 'Legal, Risk, and Public Accountability',
            content: [
              'Accessibility also carries legal and reputational implications. Organizations benefit from understanding relevant laws, documenting compliance, and coordinating legal, risk, and communications functions. When done well, accessibility supports trust, inclusion, and positive public reputation.',
              'An effective ICT accessibility program is sustained by leadership, measured through maturity, reinforced by policy, and embedded in everyday practice. When accessibility is treated as a core organizational capability, it becomes resilient, scalable, and impactful.'
            ]
          }
        ]
      }
    ]
  }
}
