import { PortableText as SanityPortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import styles from './PortableText.module.scss'

const builder = imageUrlBuilder(client)

const components = {
  block: {
    normal: ({ children }: any) => <p className={styles.paragraph}>{children}</p>,
    h2: ({ children }: any) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }: any) => <h3 className={styles.h3}>{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className={styles.blockquote}>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }: any) => <strong className={styles.strong}>{children}</strong>,
    em: ({ children }: any) => <em className={styles.em}>{children}</em>,
  },
  types: {
    image: ({ value }: any) => (
      <figure className={styles.figure}>
        <img
          src={builder.image(value).width(780).url()}
          alt={value.legende || ''}
          className={styles.image}
        />
        {value.legende && (
          <figcaption className={styles.legende}>{value.legende}</figcaption>
        )}
      </figure>
    ),
  },
}

export default function PortableText({ value }: { value: any }) {
  return (
    <div className={styles.content}>
      <SanityPortableText value={value} components={components} />
    </div>
  )
}