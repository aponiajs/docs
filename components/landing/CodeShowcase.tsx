import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  Pre,
} from 'fumadocs-ui/components/codeblock';
import { Boxes, FileCode2, Route } from 'lucide-react';
import Link from 'next/link';

const examples = [
  {
    id: 'module',
    label: 'Module',
    filename: 'cats.module.ts',
    icon: Boxes,
    code: `import { Module } from '@aponiajs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}`,
  },
  {
    id: 'controller',
    label: 'Controller',
    filename: 'cats.controller.ts',
    icon: Route,
    code: `import { Controller, Get } from '@aponiajs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly cats: CatsService) {}

  @Get()
  findAll() {
    return this.cats.findAll();
  }
}`,
  },
  {
    id: 'bootstrap',
    label: 'Bootstrap',
    filename: 'main.ts',
    icon: FileCode2,
    code: `import { AponiaFactory } from '@aponiajs/core';
import { AppModule } from './app.module';

const app = await AponiaFactory.create(AppModule);
await app.listen(3000);`,
  },
];

export function CodeShowcase() {
  return (
    <section className="code-section">
      <div className="code-shell">
        <div className="code-copy">
          <h2>Architecture, made explicit.</h2>
          <p>
            Modules, providers, and routes remain visible. Bun and Elysia keep
            the runtime direct.
          </p>
          <Link href="/docs" className="text-link">
            Read the architecture guide
          </Link>
        </div>

        <CodeBlockTabs
          defaultValue="module"
          className="code-window !my-0 min-w-0"
        >
          <CodeBlockTabsList aria-label="Code examples">
            {examples.map(({ id, label, icon: Icon }) => (
              <CodeBlockTabsTrigger key={id} value={id}>
                <Icon strokeWidth={1.7} />
                {label}
              </CodeBlockTabsTrigger>
            ))}
          </CodeBlockTabsList>
          {examples.map((example) => (
            <CodeBlockTab key={example.id} value={example.id}>
              <CodeBlock title={example.filename} className="!m-0">
                <Pre className="px-5 leading-6">
                  <code>{example.code}</code>
                </Pre>
              </CodeBlock>
            </CodeBlockTab>
          ))}
        </CodeBlockTabs>
      </div>
    </section>
  );
}
