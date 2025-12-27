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
            '<strong>Blindness:</strong> May range from no functional vision to limited perception of light/shapes. Reading print or recognizing faces visually may not be possible.',
            '<strong>Low vision:</strong> Vision that can\'t be fully corrected and affects daily tasks. People may need magnification, clearer contrast, and layouts that remain usable when zoomed.',
            '<strong>Color vision differences:</strong> Difficulty telling certain colors apart (often red/green). Meaning conveyed only through color can be missed.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            '<strong>Physical and service environments:</strong> Information posted only visually with no equivalent alternative; poor lighting or glare; obstacles in walking paths; signs and controls that can\'t be felt or identified without sight.',
            '<strong>Digital products and content:</strong> Images, buttons, and controls that don\'t have meaningful text equivalents; interfaces that break when zoomed; missing structure and orientation cues; video without alternative access to visual information; low contrast text or reliance on color alone; experiences unreliable without a mouse.'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            '<strong>Physical environment:</strong> Make routes predictable and free of hazards; use tactile and non-visual cues where appropriate; provide readable, discoverable labeling.',
            '<strong>Digital environment:</strong> Provide text equivalents for meaningful non-text content; ensure zoom and resizing don\'t hide content; use strong contrast and avoid color-only communication; keep navigation consistent and predictable.'
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
            '<strong>Deafness:</strong> Little to no functional hearing. Sign language may be a primary language for many people, which can shape comfort with written language.',
            '<strong>Hard of hearing:</strong> Partial hearing that may be supported by amplification and environmental adjustments.',
            '<strong>Auditory processing differences:</strong> Hearing sensitivity may be typical, but understanding speech—especially in noise or fast-paced conversation—may be difficult.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            '<strong>In-person communication:</strong> Speakers not using microphones in large rooms; lack of sign language interpretation; background noise and poor acoustics; group discussions where it\'s hard to track multiple speakers; poor lighting that makes lip-reading difficult.',
            '<strong>Digital products and media:</strong> Audio-only content without a text alternative; video without accurate captions or transcripts; players and meeting tools that don\'t support caption customization; experiences that require voice input as the only way to complete tasks.'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            '<strong>Communication and events:</strong> Offer captions and transcripts for recorded and live content; provide interpretation where appropriate; improve room acoustics; use facilitation practices that support turn-taking and speaker identification.',
            '<strong>Digital:</strong> Provide high-quality captions and text alternatives; ensure media tools allow users to control audio and caption presentation; don\'t make audio the only channel for critical information.'
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
            '<strong>Speech sound differences:</strong> Ranges from mild slurring to severe difficulty producing speech.',
            '<strong>Motor-planning or muscle-control impacts:</strong> Speech may be slow, inconsistent, or difficult to coordinate.',
            '<strong>No functional speech (mutism):</strong> Can have neurological causes, psychological causes, or a combination.',
            '<strong>Aphasia:</strong> Language impairment due to brain-related causes; can affect speaking, understanding, reading, and writing.'
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
            '<strong>Fine motor / dexterity limitations:</strong> Difficulty with small precise movements (buttons, zippers, tight grips, typing).',
            '<strong>Ambulation limitations:</strong> Walking may be difficult or unsafe; distance and terrain matter.',
            '<strong>Fatigue and reduced stamina:</strong> Energy limits can affect what\'s possible, even when strength is present.',
            '<strong>Body size or shape-related barriers:</strong> Equipment and spaces may not accommodate varied stature, proportions, or joint mobility.'
          ]
        },
        {
          heading: 'Common barriers',
          content: [
            '<strong>Physical environment:</strong> Narrow routes, tight aisles, heavy doors, and steps without equivalent entry routes; controls placed out of reach; seating, tables, kiosks, and equipment designed for a narrow "standard body"; social barriers such as stigma and discrimination.',
            '<strong>Digital products:</strong> Small tap targets or tightly packed controls that require precision; interactions that assume mouse-only or keyboard-only control with no flexibility; time-limited tasks that don\'t account for slower or alternative input.'
          ]
        },
        {
          heading: 'Practical accessibility solutions',
          content: [
            '<strong>Physical:</strong> Provide step-free access, adequate width, and clear paths; design reach ranges and controls for varied postures and mobility; use handles and controls that don\'t demand tight grip strength; offer spaces and furniture that accommodate different bodies comfortably and safely.',
            '<strong>Digital:</strong> Increase target sizes and spacing; reduce precision demands; ensure multiple input methods can complete tasks; avoid punishing time constraints; provide ways to extend time or resume.'
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
            '<strong>Intellectual disability:</strong> Differences in reasoning/learning and in everyday adaptive skills (conceptual, social, practical).',
            '<strong>Reading-related disabilities (including dyslexia):</strong> Difficulty processing written language, decoding, spelling, or reading fluently.',
            '<strong>Math-related disabilities (including dyscalculia):</strong> Difficulty understanding quantities, math facts, mental calculation, or numeric reasoning.',
            '<strong>ADHD:</strong> Patterns of inattention and/or impulsivity/hyperactivity that can affect task initiation, organization, and sustained focus.',
            '<strong>Autism:</strong> Differences in social communication and patterns of repetitive behavior or routines; may include sensory sensitivities.',
            '<strong>Nonverbal learning profiles:</strong> Strong verbal skills paired with difficulty in social interpretation, transitions, abstract reasoning, or "big picture" synthesis.'
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
            '<strong>General communication and work/learning contexts:</strong> Use plain language and predictable structure; provide clear steps, examples, and feedback loops; reduce unnecessary noise and distraction; allow preparation time and avoid avoidable time pressure.',
            '<strong>Physical environments:</strong> Make key destinations easy to locate with simple routes and clear cues; provide signage that is large, legible, and unambiguous; use straightforward wayfinding with consistent patterns.',
            '<strong>Digital:</strong> Simplify content and interaction flows; reduce distractions and help users focus on what matters; offer information in more than one mode when helpful; make timing flexible and support personalization.'
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
}
