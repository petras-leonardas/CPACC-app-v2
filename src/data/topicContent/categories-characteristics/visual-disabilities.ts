import type { TopicSection } from '../types'

export const visualDisabilities: TopicSection = {
  heading: 'Visual disabilities',
  content: 'Visual disabilities cover a huge range of experiences. It is not just about being totally blind; it includes people who see things through a "fog," people who are very sensitive to light (photophobia), and people who see colors differently. Some people experience "tunnel vision" where they only see the center of their view, while others might lose their central vision and only see through the edges of their eyes.',
  subsections: [
    {
      heading: 'The numbers you need to know',
      content: [
        '<ul class="list-disc ml-6 mt-2 space-y-1"><li>Globally, at least <strong>2.2 billion</strong> people have some kind of vision impairment.</li><li>At least <strong>1 billion</strong> of those cases could have been prevented or are waiting to be treated by a doctor.</li><li>Most people with vision impairment are <strong>over 50 years old</strong>, often due to age-related conditions like cataracts. This means accessibility is something almost all of us will need as we get older.</li><li>For color blindness, it affects about <strong>1 in 12 males</strong> (8.3%) but only <strong>1 in 200 females</strong> (0.5%).</li></ul>',
      ]
    },
    {
      heading: 'Blindness',
      content: 'This can range from seeing nothing at all to being able to tell light from dark. Some people can see the general shape of a large building but cannot read the text on a sign or recognize a friend\'s face visually. Many people who are blind rely on "Screen Readers," which are software programs that read out the text and "behind-the-scenes" code of a website using a synthetic voice. If a website isn\'t built correctly, the screen reader might just say "Button" without telling the user what the button actually does.'
    },
    {
      heading: 'Low vision',
      content: [
        'Low vision is vision loss that cannot be fixed with regular glasses or surgery. It affects about <strong>246 million</strong> people worldwide. It is best defined as "not enough vision to do what you need to do." This is very personal; a person might be able to navigate a familiar hallway just fine but find it impossible to read the tiny, low-contrast text on a digital receipt or a website footer.',
        '<strong>Common barriers</strong>:<ul class="list-disc ml-6 mt-2 space-y-1"><li>Signs that are only printed without any tactile (touchable) letters or Braille. Imagine being in a hotel and not being able to "feel" which door is your room because the numbers are just flat stickers.</li><li>Websites that use images without "alt text." Without this hidden description, a blind user might hear their computer just say "Image 456," which tells them nothing about the content.</li><li>Low-contrast text, such as light grey text on a white background. This makes letters "fade away" into the page, making it painful or impossible to read.</li><li>Visual information that is "locked" in a video with no audio description to explain the action. If a character in a movie points to a map but doesn\'t say anything out loud, a blind viewer misses a huge part of the story.</li></ul>',
      ]
    },
  ]
}
