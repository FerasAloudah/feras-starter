const { requireField, setGeneratorWithDefaults } = require('./plop-utils');

module.exports = (plop) => {
  setGeneratorWithDefaults({
    baseActions(path) {
      return [
        {
          path: `src/${path}/components/{{kebabCase name}}.tsx`,
          templateFile: '.plop/Component/Component.tsx.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/components/index.ts`,
          skipIfExists: true,
          templateFile: '.plop/injectable-index.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/components/index.ts`,
          separator: '',
          template: `export * from './{{kebabCase name}}';\n`,
          type: 'append',
        },
      ];
    },
    basePrompts: [
      {
        message: `What is your component's name?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
      {
        default: true,
        message: 'Does the component have children?',
        name: 'hasChildren',
        type: 'confirm',
      },
    ],
    description: 'Create a reusable component',
    dynamicPrompt(inquirer, answers) {
      const { hasChildren } = answers;

      if (hasChildren) {
        return [];
      }

      return [
        {
          default: true,
          message: 'Should the component be wrapped with memo?',
          name: 'isMemo',
          type: 'confirm',
        },
      ];
    },
    folder: 'components',
    name: 'component',
    plop,
    storiesTemplate: '.plop/Component/Component.stories.tsx.hbs',
    testsTemplate: '.plop/Component/Component.test.tsx.hbs',
  });
  setGeneratorWithDefaults({
    baseActions(path) {
      return [
        {
          path: `src/${path}/hooks/use-{{kebabCase name}}.ts`,
          templateFile: '.plop/Hook/CustomHook.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/hooks/index.ts`,
          skipIfExists: true,
          templateFile: '.plop/injectable-index.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/hooks/index.ts`,
          separator: '',
          template: `export * from './use-{{kebabCase name}}';\n`,
          type: 'append',
        },
      ];
    },
    basePrompts: [
      {
        message: `What is your hook's name (without 'use')?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
    ],
    description: 'Create a custom react hook',
    folder: 'hooks',
    name: 'hook',
    namePrefix: 'use-',
    plop,
    testsTemplate: '.plop/Hook/CustomHook.test.ts.hbs',
  });
  setGeneratorWithDefaults({
    baseActions(path) {
      return [
        {
          path: `src/${path}/reducers/{{kebabCase name}}.reducer.ts`,
          templateFile: '.plop/Reducer/Reducer.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/hooks/use-{{kebabCase name}}.ts`,
          templateFile: '.plop/Reducer/ReducerHook.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/reducers/index.ts`,
          skipIfExists: true,
          templateFile: '.plop/injectable-index.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/hooks/index.ts`,
          skipIfExists: true,
          templateFile: '.plop/injectable-index.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/reducers/index.ts`,
          separator: '',
          template: `export * from './{{kebabCase name}}.reducer';\n`,
          type: 'append',
        },
        {
          path: `src/${path}/hooks/index.ts`,
          separator: '',
          template: `export * from './use-{{kebabCase name}}';\n`,
          type: 'append',
        },
      ];
    },
    basePrompts: [
      {
        message: `What is your reducer's name (without 'Reducer')?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
    ],
    description: 'Create a custom react reducer',
    folder: 'reducers',
    name: 'reducer',
    namePrefix: 'use-',
    plop,
    testsTemplate: '.plop/Reducer/ReducerHook.test.ts.hbs',
  });
  setGeneratorWithDefaults({
    baseActions(path) {
      return [
        {
          path: `src/${path}/stores/{{kebabCase name}}-store.ts`,
          templateFile: '.plop/Store.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/stores/index.ts`,
          skipIfExists: true,
          templateFile: '.plop/injectable-index.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/stores/index.ts`,
          separator: '',
          template: `export * from './{{kebabCase name}}-store';\n`,
          type: 'append',
        },
      ];
    },
    basePrompts: [
      {
        message: `What is your store's name (without 'Store')?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
      {
        default: true,
        message: 'Should the store be persisted?',
        name: 'persist',
        type: 'confirm',
      },
    ],
    description: 'Create a new store',
    folder: 'stores',
    name: 'store',
    namePrefix: 'use-',
    plop,
  });
  setGeneratorWithDefaults({
    baseActions(path) {
      return [
        {
          path: `src/${path}/contexts/{{kebabCase name}}-context.tsx`,
          templateFile: '.plop/Context.tsx.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/contexts/index.ts`,
          skipIfExists: true,
          templateFile: '.plop/injectable-index.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/contexts/index.ts`,
          separator: '',
          template: `export * from './{{kebabCase name}}-context';\n`,
          type: 'append',
        },
      ];
    },
    basePrompts: [
      {
        message: `What is your context's name (without 'Context')?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
    ],
    description: 'Create a new context',
    folder: 'contexts',
    name: 'context',
    nameSuffix: '-context',
    plop,
  });
  setGeneratorWithDefaults({
    baseActions: [
      {
        path: 'src/pages/{{kebabCase name}}.tsx',
        templateFile: '.plop/Page/Page.tsx.hbs',
        type: 'add',
      },
      {
        path: 'public/locales/ar/{{kebabCase name}}.json',
        templateFile: '.plop/Page/Page.translation.json.hbs',
        type: 'add',
      },
      {
        path: 'public/locales/en/{{kebabCase name}}.json',
        templateFile: '.plop/Page/Page.translation.json.hbs',
        type: 'add',
      },
    ],
    basePrompts: [
      {
        message: 'What is your page name?',
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
      {
        choices: [
          { name: 'Server-side Rendering (SSR)', value: 'SSR' },
          { name: 'Incremental Static Regeneration (ISR)', value: 'ISR' },
          { name: 'Static Site Generation (SSG)', value: 'SSG' },
        ],
        message: 'What kind of page are you creating?',
        name: 'pageType',
        type: 'list',
      },
    ],
    description: 'Create a new page',
    e2eTestsTemplate: '.plop/Page/Page.spec.ts.hbs',
    folder: 'pages',
    name: 'page',
    pathOverride: true,
    plop,
    storiesTemplate: '.plop/Page/Page.stories.tsx.hbs',
  });
  setGeneratorWithDefaults({
    baseActions: [
      {
        path: 'src/pages/api/{{kebabCase name}}.ts',
        templateFile: '.plop/API/API.ts.hbs',
        type: 'add',
      },
    ],
    basePrompts: [
      {
        message: `What is your endpoint's name?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
    ],
    description: 'Create a new endpoint',
    folder: 'api',
    name: 'endpoint',
    pathOverride: true,
    plop,
    testsTemplate: '.plop/API/API.test.ts.hbs',
  });
  plop.setHelper('eq', (a, b) => a.toString().toLowerCase() === b.toString().toLowerCase());
};
