import React from 'react';

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function CollectionPageSchema({
  name,
  description,
  url,
  items
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; position: number }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "name": "Geprüfte Solar-Hardware & Speicherkomponenten",
      "numberOfItems": items.length,
      "itemListElement": items.map((item) => ({
        "@type": "ListItem",
        "position": item.position,
        "name": item.name
      }))
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
