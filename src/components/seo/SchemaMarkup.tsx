import type { ComponentPropsWithoutRef } from 'react'

type SchemaType = 'Physician' | 'MedicalProcedure' | 'MedicalClinic' | 'LocalBusiness' | 'FAQPage' | 'BreadcrumbList'

interface SchemaMarkupProps extends ComponentPropsWithoutRef<'script'> {
  type: SchemaType
  data: Record<string, unknown>
}

/**
 * Small helper to inject JSON-LD blocks with typed schemas.
 * Keeps schema generation reusable across landing and service pages.
 */
export function SchemaMarkup({ type, data, ...rest }: SchemaMarkupProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  }

  return (
    <script
      type="application/ld+json"
      {...rest}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
