import type { DetailedTopicContent } from './types'

export const categoriesCharacteristics: DetailedTopicContent = {
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
      heading: 'Visual disabilities',
      content: 'Visual disabilities include a wide spectrum of experiences related to seeing. They are not limited to total blindness and often involve partial, fluctuating, or context-dependent vision. Some people rely primarily on non-visual access to information, while others depend on magnification, contrast enhancement, or stable visual layouts. The way visual disability affects someone\'s daily life depends heavily on lighting conditions, visual complexity, and how information is presented.',
      subsections: [
        {
          heading: 'Common subtypes and characteristics',
          content: [
            '<strong>Blindness:</strong> Blindness can range from complete absence of vision to limited perception of light, contrast, or large shapes. Some people may detect light or movement but cannot read text or recognize faces visually. Others may have usable vision in specific conditions but still rely on non-visual access for most tasks.',
            '<strong>Low vision:</strong> Low vision refers to vision that cannot be fully corrected with glasses, contact lenses, medication, or surgery and interferes with daily activities. People with low vision may need magnification, strong contrast, or layouts that remain usable when zoomed. Low vision is best understood functionally: it is "not enough vision to do what you need to do," and that threshold differs from person to person.',
            '<strong>Color vision differences:</strong> Color vision differences affect the ability to distinguish certain colors. The most common form involves difficulty distinguishing red and green, but blue-yellow differences also exist. Color vision differences do not usually affect sharpness of vision, but they can make information conveyed only through color completely inaccessible.'
          ]
        },
        {
          heading: 'Statistical context',
          content: [
            'Globally, at least 2.2 billion people have vision impairment or blindness, and at least 1 billion cases are preventable or unaddressed (World Health Organization).',
            'The leading causes worldwide are uncorrected refractive errors and cataracts.',
            'Most people with vision impairment are over 50 years old.',
            'Low vision affects ~246 million people (3.5% of the global population), and around 90% live in low-income settings.',
            'Red–green color vision deficiency affects 1 in 12 males (8.3%) and 1 in 200 females (0.5%).',
            'Blue–yellow color vision deficiency occurs in fewer than 1 in 100,000 people worldwide.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            'Physical and service environments that rely exclusively on visual information (printed-only signage, visual-only instructions)',
            'Poor lighting, glare, or visually cluttered environments',
            'Obstacles in walking paths that cannot be detected non-visually',
            'Digital content where images, buttons, or controls lack meaningful text alternatives',
            'Interfaces that break or lose information when zoomed',
            'Navigation that lacks structure, orientation cues, or consistency',
            'Low contrast text or reliance on color alone to convey meaning',
            'Experiences that assume mouse use and fail with keyboard-only interaction'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            '<strong>Physical environments:</strong> predictable layouts, clear paths, tactile and non-visual cues, readable and discoverable labeling',
            '<strong>Digital environments:</strong> text alternatives for meaningful non-text content; layouts that remain usable when zoomed; strong contrast; no color-only communication; consistent navigation and structure'
          ]
        }
      ]
    },
    {
      heading: 'Auditory disabilities',
      content: [
        'Auditory disabilities involve differences in how people perceive, process, or understand sound. These disabilities are not only about volume or hearing sensitivity; they also include how the brain interprets sound. Communication preferences and needs can vary significantly depending on whether hearing loss is present from birth or acquired later in life.',
        'Some people primarily use spoken language with amplification or environmental supports. Others primarily use sign language and may experience written language differently, especially if sign language is their first language. Auditory disabilities often interact strongly with environmental factors such as background noise, acoustics, pacing of speech, and visual access to speakers.'
      ],
      subsections: [
        {
          heading: 'Common subtypes and characteristics',
          content: [
            '<strong>Deafness:</strong> Deafness involves little to no functional hearing. For many people born deaf, sign language is their first language. Written and spoken languages may be second languages, which can affect comfort with dense text or phonetic spelling systems.',
            '<strong>Hard of hearing:</strong> Hard-of-hearing individuals have partial hearing loss that may be supported by hearing aids, cochlear implants, or assistive listening systems. Hearing ability may fluctuate based on environment, distance, and competing sounds.',
            '<strong>Auditory processing differences (APD):</strong> In auditory processing disorder, hearing sensitivity may be typical, but the brain has difficulty interpreting, organizing, or understanding sound. People with APD may struggle to follow spoken instructions, locate sound sources, or understand speech in noisy or fast-paced environments, even though standard hearing tests show normal results.'
          ]
        },
        {
          heading: 'Statistical context',
          content: [
            '~430 million people globally have disabling hearing loss (World Health Organization).',
            '~750,000 people in the EU use sign language as their first language.',
            'Central Auditory Processing Disorder affects ~5% of the global population (American Speech-Language-Hearing Association).'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            'Speakers not using microphones in large or reverberant spaces',
            'Lack of sign language interpretation',
            'Background noise and poor acoustics',
            'Group conversations where multiple speakers overlap',
            'Poor lighting that makes lip-reading difficult',
            'Digital content that is audio-only',
            'Videos without accurate captions or transcripts',
            'Media players and meeting tools that do not allow caption customization',
            'Systems that require voice interaction as the only way to complete tasks'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            '<strong>Communication and events:</strong> captions and transcripts for recorded and live content; sign language interpretation when appropriate; improved acoustics; facilitation practices that support turn-taking',
            '<strong>Digital environments:</strong> high-quality captions; text alternatives for audio; user control over audio and caption presentation; avoiding audio-only critical information'
          ]
        }
      ]
    },
    {
      heading: 'Deaf-blindness',
      content: [
        'Deaf-blindness involves combined hearing and vision limitations. Most people who are deaf-blind are not completely deaf nor completely blind, but the combination of both sensory losses creates unique access challenges. Because both distance senses are affected, touch often becomes the primary channel for complex communication.',
        'Small accessibility gaps — such as missing structure, incomplete transcripts, or unreliable output — can turn partial access into total inaccessibility.'
      ],
      subsections: [
        {
          heading: 'Common characteristics',
          content: [
            'Heavy reliance on tactile or highly structured alternatives',
            'Use of braille and tactile forms of sign language',
            'Extreme sensitivity to content quality and completeness',
            'Limited ability to compensate through another sense'
          ]
        },
        {
          heading: 'Statistical context',
          content: [
            'Deaf-blindness affects between 0.2% and 2% of the global population.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            'Printed materials and wayfinding without tactile equivalents',
            'Digital content that does not produce reliable, structured output',
            'Audio and video without transcripts that can be converted to braille',
            'Lack of access to tactile interpretation when needed'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            'Ensure text-based versions of audio and video content exist',
            'Maintain clean, semantic structure in digital content',
            'Plan communication access in advance rather than improvising'
          ]
        }
      ]
    },
    {
      heading: 'Speech and language disabilities',
      content: [
        'Speech and language disabilities are related but distinct. Language involves understanding and expressing ideas through words, symbols, reading, and writing. Speech involves the physical production of sounds. A person may have difficulty speaking clearly while having strong language comprehension, or they may have language impairment even if speech sounds intact.',
        'These disabilities often require time, flexibility, and alternative communication pathways, rather than assumptions about intelligence or competence.'
      ],
      subsections: [
        {
          heading: 'Common subtypes and characteristics',
          content: [
            '<strong>Speech sound differences:</strong> These range from mild slurring to severe difficulty producing intelligible speech. Speech clarity may vary by fatigue, stress, or environment.',
            '<strong>Motor-planning or muscle-control impacts:</strong> Conditions such as apraxia or dysarthria can make speech slow, inconsistent, or difficult to coordinate, even when the person knows exactly what they want to say.',
            '<strong>No functional speech (mutism):</strong> Mutism may have neurological causes, psychological causes, or a combination. It does not imply lack of language comprehension.',
            '<strong>Aphasia:</strong> Aphasia is a language disorder caused by brain injury (most commonly stroke). It can affect speaking, understanding speech, reading, and writing. Different forms of aphasia affect different aspects of language.'
          ]
        },
        {
          heading: 'Statistical context',
          content: [
            'Speech and language disabilities affect ~5–20% of children, compared to ~1–2% of adults.',
            'Aphasia affects ~2 million people in the US and ~250,000 people in the UK.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            'Communication systems that assume fast, fluent speech',
            'Interactions that do not allow time to type or use alternatives',
            'Lack of patience or understanding from others',
            'No non-speech options for essential services or tasks'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            'Offer multiple communication channels',
            'Allow extra response time',
            'Use respectful interaction practices',
            'Keep communication paths clear and simple'
          ]
        }
      ]
    },
    {
      heading: 'Mobility, flexibility, and body-structure disabilities',
      content: [
        'Mobility, flexibility, and body-structure disabilities affect a person\'s ability to move their body purposefully and safely. This includes walking, reaching, gripping, maintaining posture, sustaining physical effort, and performing fine motor actions. These disabilities are not limited to wheelchair use and are often highly variable over time.',
        'Some people experience permanent mobility impairments, others experience temporary limitations (such as injury), and many experience episodic or fluctuating limitations, where fatigue, pain, or stiffness changes from day to day. Environmental design plays a major role in determining whether these limitations become disabling.'
      ],
      subsections: [
        {
          heading: 'Common subtypes and characteristics',
          content: [
            '<strong>Fine motor / dexterity limitations:</strong> Difficulty with small, precise movements such as typing, tapping small buttons, turning knobs, fastening clothing, or handling tools. Dexterity may be affected by neurological conditions, arthritis, tremors, injury, or fatigue.',
            '<strong>Ambulation limitations:</strong> Ambulation refers to the ability to walk independently, with or without an assistive device. Limitations may involve balance, endurance, joint stability, pain, or safety. Distance, slope, surface texture, and availability of rest all matter.',
            '<strong>Fatigue and reduced stamina:</strong> Some people experience muscle fatigue or low endurance that limits how long they can stand, walk, or interact physically—even if they appear physically capable for short periods. Fatigue can be invisible and episodic.',
            '<strong>Body size or shape–related barriers:</strong> Disabilities related to stature, proportions, joint mobility, or body mass can make standard furniture, controls, and spaces unusable or unsafe. Barriers often arise not from the body itself, but from rigid assumptions about a "standard" body.'
          ]
        },
        {
          heading: 'Statistical context',
          content: [
            'Approximately 11% of adults in the United States have mobility disabilities, with similar prevalence reported in Europe and Canada.',
            'Reliable global statistics vary due to differences in definitions and reporting, but mobility-related impairments are among the most common disability types worldwide.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            '<strong>Physical environments:</strong> Narrow doorways and aisles; steps without equivalent entry routes; heavy doors; controls placed too high or too low; seating and tables without adequate clearance; kiosks and equipment that require standing or precise reach; social stigma and body-based discrimination.',
            '<strong>Digital products:</strong> Small or tightly packed interactive targets; interfaces requiring high precision; interactions that assume mouse-only or keyboard-only use; time-limited tasks that do not allow slower or alternative input.'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            '<strong>Physical environments:</strong> Step-free access; wide, unobstructed paths; reachable controls from varied postures; handles and controls that do not require tight grip strength; furniture and equipment that accommodate diverse bodies comfortably and safely.',
            '<strong>Digital environments:</strong> Larger touch targets and adequate spacing; reduced precision requirements; support for multiple input methods; flexible timing with options to extend or resume tasks.'
          ]
        }
      ]
    },
    {
      heading: 'Cognitive disabilities',
      content: [
        'Cognitive disabilities affect mental processes such as attention, memory, perception, language processing, reasoning, planning, emotional regulation, and calculation. Importantly, cognitive performance is highly context-dependent. Stress, fatigue, noise, time pressure, and information overload can significantly reduce anyone\'s cognitive capacity—and disproportionately affect people with cognitive disabilities.',
        'A critical accessibility insight is that designing to support cognitive functions (like memory or attention) is often more effective than designing for specific diagnoses.'
      ],
      subsections: [
        {
          heading: 'Examples of cognitive-related conditions and characteristics',
          content: [
            '<strong>Intellectual disability:</strong> Involves differences in reasoning, learning, and adaptive behavior. Adaptive skills include conceptual (language, numbers), social (interaction, judgment), and practical (daily living, work tasks) abilities. Cultural and environmental context strongly influences how limitations appear.',
            '<strong>Reading-related disabilities (including dyslexia):</strong> Difficulty decoding, spelling, reading fluently, or processing written language. Intelligence is not affected, but text-heavy or poorly structured content can be exhausting or inaccessible.',
            '<strong>Math-related disabilities (including dyscalculia):</strong> Difficulty understanding quantities, numerical relationships, math facts, or mental calculation. This can affect time estimation, money handling, and interpreting numerical information.',
            '<strong>Attention Deficit Hyperactivity Disorder (ADHD):</strong> Patterns of inattention and/or impulsivity that affect task initiation, organization, sustained focus, and completion. ADHD may involve hyperactivity, but many people—especially adults—primarily experience attention and executive-function challenges.',
            '<strong>Autism spectrum conditions:</strong> Differences in social communication and interaction, along with patterns of repetitive behaviors or routines. Sensory sensitivities (sound, light, texture) are common. Cognitive abilities vary widely, from intellectual disability to above-average intelligence.',
            '<strong>Non-verbal learning profiles (NLD):</strong> Often involve strong verbal skills paired with difficulty interpreting social cues, managing transitions, abstract reasoning, or synthesizing the "big picture."'
          ]
        },
        {
          heading: 'Statistical context',
          content: [
            'Dyslexia affects 5–10% of the population, with estimates as high as 17%; 70–80% of people with reading difficulties have some form of dyslexia.',
            'Dyscalculia affects approximately 3–6% of people.',
            'ADHD affects 2–7% of children globally and around 4% of adults.',
            'Autism affects approximately 1 in 100 people worldwide.',
            'Non-verbal learning disability affects roughly 1% of children in the United States.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            'Difficulty finding important information or understanding page purpose',
            'Complex forms and multi-step processes',
            'Password and account-management burdens',
            'Confusing or inconsistent controls',
            'Distracting layouts, clutter, and dense text',
            'Timeouts that interrupt planning and increase stress',
            'These barriers affect everyone to some degree, but for people with cognitive disabilities they often cause task abandonment rather than delay.'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            '<strong>General contexts:</strong> Plain language; predictable structure; clear steps and examples; feedback loops; reduced noise and distraction; adequate preparation time.',
            '<strong>Physical environments:</strong> Simple routes; easy-to-find destinations; large, legible, unambiguous signage; consistent wayfinding patterns.',
            '<strong>Digital environments:</strong> Simplified flows; reduced distraction; multi-modal information where helpful; flexible timing; personalization options.'
          ]
        }
      ]
    },
    {
      heading: 'Seizure disabilities',
      content: 'Seizure disabilities involve neurological conditions where seizures interfere with daily activities, safety, or independence. Seizures vary widely in type and severity, from brief changes in awareness to convulsions and loss of consciousness. Some seizures are triggered by visual stimuli, making digital and media environments especially important.',
      subsections: [
        {
          heading: 'Common characteristics',
          content: [
            'Seizures may affect awareness, movement, sensation, or perception',
            'Triggers vary by individual',
            'Recovery time and after-effects can affect participation beyond the seizure itself'
          ]
        },
        {
          heading: 'Statistical context',
          content: [
            'Epilepsy affects approximately 50 million people globally, making it one of the most common neurological conditions.',
            'Photosensitive epilepsy affects about 3% of people with epilepsy.',
            'Flashing or flickering between 16 and 25 times per second is most likely to trigger seizures, though sensitivity varies.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            'Activities where sudden loss of consciousness poses risk',
            'Digital content with flashing, flickering, or rapidly changing visuals',
            'Media players without pause, stop, or motion-reduction controls'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            'Avoid flashing content beyond safe thresholds',
            'Minimize unnecessary motion and visual effects',
            'Provide user controls to pause, stop, or reduce animation and video effects',
            'Design for visual stability and predictability'
          ]
        }
      ]
    },
    {
      heading: 'Psychological disabilities',
      content: 'Psychological disabilities include mental health conditions that affect mood, perception, thinking, and behavior. These conditions may be long-term or episodic, and their impact often fluctuates with stress, environment, and access to support. Many psychological disabilities also involve cognitive impacts, especially during acute episodes.',
      subsections: [
        {
          heading: 'Examples and characteristics',
          content: [
            '<strong>Anxiety disorders:</strong> Include generalized anxiety disorder, panic disorder, and social anxiety. Anxiety may involve persistent worry, heightened stress responses, difficulty concentrating, and avoidance of certain situations.',
            '<strong>Mood disorders:</strong> Such as depression and bipolar disorder. These affect emotional regulation, energy levels, motivation, sleep, and cognitive processing. Bipolar disorder involves cycles of depression and mania or hypomania.',
            '<strong>Psychotic disorders:</strong> Such as schizophrenia, involving delusions, hallucinations, and disorganized thinking. Cognitive impairments related to attention and decision-making may also be present.'
          ]
        },
        {
          heading: 'Statistical context',
          content: [
            'In 2017, approximately 284 million people worldwide experienced an anxiety disorder, making it the most prevalent mental health condition.',
            'Bipolar disorder affected around 19 million people worldwide in 2019.',
            'Schizophrenia affects approximately 1 in 300 people globally.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            'Limited access to affordable, appropriate mental healthcare',
            'Misdiagnosis or lack of knowledgeable support',
            'Social stigma and discrimination',
            'Educational and workplace environments that do not accommodate fluctuating needs',
            'Systems that increase stress through complexity, time pressure, or punitive errors'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            'Reduce unnecessary cognitive load and information overload',
            'Provide predictable processes and clear expectations',
            'Allow flexibility in pacing and participation',
            'Design interactions that reduce stress and support recovery'
          ]
        }
      ]
    },
    {
      heading: 'Multiple or complex disabilities',
      content: 'Multiple or complex disabilities refer to the presence of more than one disability at the same time, which may be sensory, physical, cognitive, psychological, or a combination. Needs cannot be inferred from any single category, and interactions between disabilities often create unique and compounded barriers.',
      subsections: [
        {
          heading: 'Common characteristics',
          content: [
            'Overlapping impacts on communication, mobility, sensory processing, learning, and daily living',
            'Support needs are often broader and more interconnected',
            'Fatigue from switching strategies or environments is common'
          ]
        },
        {
          heading: 'Statistical context',
          content: [
            'Estimates from the UK and Australia suggest 10–15% of people with disabilities have complex or multiple disabilities, though global data is limited.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            'Accommodation systems designed for single-issue needs',
            'Fragmented services that do not coordinate support',
            'Environments that require constant adaptation'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            'Treat accessibility as layered and flexible',
            'Offer multiple ways to perceive, operate, and understand information',
            'Avoid one-path designs; build redundancy and choice',
            'Focus on individualized needs across environments, not isolated fixes'
          ]
        }
      ]
    }
  ]
}
