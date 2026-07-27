import { absoluteUrl } from '@/lib/site';

export const revalidate = false;

const searchAndRetrievalAgents = [
  'Googlebot',
  'bingbot',
  'Applebot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Amzn-SearchBot',
  'Amzn-User',
];

const trainingAgents = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'CCBot',
];

const contentSignal =
  'Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference';

export function GET() {
  const searchRules = [
    ...searchAndRetrievalAgents.map((agent) => `User-agent: ${agent}`),
    contentSignal,
    'Allow: /',
    'Disallow: /api/search',
  ];
  const trainingRules = trainingAgents.flatMap((agent) => [
    `User-agent: ${agent}`,
    'Disallow: /',
    '',
  ]);
  const defaultRules = [
    'User-agent: *',
    contentSignal,
    'Allow: /',
    'Disallow: /api/search',
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
  ];

  return new Response(
    [...searchRules, '', ...trainingRules, ...defaultRules].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
}
