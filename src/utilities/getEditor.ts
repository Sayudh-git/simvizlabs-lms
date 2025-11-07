import { HorizontalRuleFeature, FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical"

export const editor = lexicalEditor({
  features: ({ defaultFeatures }) => {
    return [
      // ...rootFeatures,
      ...defaultFeatures,
      // HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature()
    ];
  }
});