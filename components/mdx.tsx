import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { CodeCompare, CodeCompareSide } from './docs/CodeCompare';
import {
  Choice,
  ChoiceCards,
  CompareMatrix,
  FrameworkList,
  Verdict,
} from './docs/compare';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    CodeCompare,
    CodeCompareSide,
    CompareMatrix,
    ChoiceCards,
    Choice,
    FrameworkList,
    Verdict,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
