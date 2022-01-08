const requireField = (fieldName) => {
  return (value) => {
    if (String(value).length === 0) {
      return `${fieldName} is required`;
    }
    return true;
  };
};

const shouldCreate = (actionName, fieldName) => {
  return (data) => {
    if (!data[fieldName]) {
      return `[SKIPPED] ${actionName}`;
    }
  };
};

module.exports = (plop) => {
  plop.setGenerator('component', {
    actions: [
      {
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: '.plop/Component/Component.tsx.hbs',
        type: 'add',
      },
      {
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        skip: shouldCreate('creating tests', 'createTests'),
        templateFile: '.plop/Component/Component.test.tsx.hbs',
        type: 'add',
      },
      {
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        skip: shouldCreate('creating stories', 'createStories'),
        templateFile: '.plop/Component/Component.stories.tsx.hbs',
        type: 'add',
      },
      {
        path: 'src/components/{{pascalCase name}}/index.ts',
        templateFile: '.plop/Component/index.ts.hbs',
        type: 'add',
      },
      {
        path: 'src/components/index.ts',
        skipIfExists: true,
        templateFile: '.plop/injectable-index.ts.hbs',
        type: 'add',
      },
      {
        path: 'src/components/index.ts',
        separator: '',
        template: `export * from './{{pascalCase name}}';\n`,
        type: 'append',
      },
    ],
    description: 'Create a reusable component',
    prompts: [
      {
        message: 'What is your component name?',
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
      {
        default: true,
        message: 'Do you want to create tests for this component?',
        name: 'createTests',
        type: 'confirm',
      },
      {
        default: true,
        message: 'Do you want to create stories for this component?',
        name: 'createStories',
        type: 'confirm',
      },
    ],
  });
  plop.setGenerator('page', {
    actions: [
      {
        path: 'src/pages/{{kebabCase name}}.tsx',
        templateFile: '.plop/Page/Page.tsx.hbs',
        type: 'add',
      },
      {
        path: 'src/stories/{{kebabCase name}}.stories.tsx',
        skip: shouldCreate('creating stories', 'createStories'),
        templateFile: '.plop/Page/Page.stories.tsx.hbs',
        type: 'add',
      },
      {
        path: 'cypress/integration/{{kebabCase name}}/{{kebabCase name}}.spec.ts',
        skip: shouldCreate('creating e2e tests', 'createE2e'),
        templateFile: '.plop/Page/Page.spec.ts.hbs',
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
    description: 'Create a new page',
    prompts: [
      {
        message: 'What is your page name?',
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
      {
        choices: ['SSR', 'ISR'],
        message: 'What kind of page are you creating?',
        name: 'pageType',
        type: 'list',
      },
      {
        default: true,
        message: 'Do you want to create stories for this page?',
        name: 'createStories',
        type: 'confirm',
      },
      {
        default: true,
        message: 'Do you want to create e2e tests for this page?',
        name: 'createE2e',
        type: 'confirm',
      },
    ],
  });
  plop.setGenerator('hook', {
    actions: [
      {
        path: 'src/hooks/use{{pascalCase name}}.ts',
        templateFile: '.plop/CustomHook.ts.hbs',
        type: 'add',
      },
      {
        path: 'src/hooks/index.ts',
        skipIfExists: true,
        templateFile: '.plop/injectable-index.ts.hbs',
        type: 'add',
      },
      {
        path: 'src/hooks/index.ts',
        separator: '',
        template: `export * from './use{{pascalCase name}}';\n`,
        type: 'append',
      },
    ],
    description: 'Create a custom react hook',
    prompts: [
      {
        message: `What is your hook name (without 'use')?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
    ],
  });
  plop.setGenerator('reducer', {
    actions: [
      {
        path: 'src/reducers/{{kebabCase name}}.reducer.ts',
        templateFile: '.plop/Reducer.ts.hbs',
        type: 'add',
      },
      {
        path: 'src/reducers/index.ts',
        skipIfExists: true,
        templateFile: '.plop/injectable-index.ts.hbs',
        type: 'add',
      },
      {
        path: 'src/reducers/index.ts',
        separator: '',
        template: `export * from './{{kebabCase name}}.reducer';\n`,
        type: 'append',
      },
    ],
    description: 'Create a custom react reducer',
    prompts: [
      {
        message: `What is your reducer name (without 'Reducer')?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
    ],
  });
  plop.setGenerator('store', {
    actions: [
      {
        path: 'src/stores/{{pascalCase name}}Store.ts',
        templateFile: '.plop/Store.ts.hbs',
        type: 'add',
      },
      {
        path: 'src/stores/index.ts',
        skipIfExists: true,
        templateFile: '.plop/injectable-index.ts.hbs',
        type: 'add',
      },
      {
        path: 'src/stores/index.ts',
        separator: '',
        template: `export * from './{{pascalCase name}}Store';\n`,
        type: 'append',
      },
    ],
    description: 'Create a new store',
    prompts: [
      {
        message: `What is your store name (without 'Store')?`,
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
  });
  plop.setGenerator('context', {
    actions: [
      {
        path: 'src/contexts/{{pascalCase name}}Context.tsx',
        templateFile: '.plop/Context.tsx.hbs',
        type: 'add',
      },
      {
        path: 'src/contexts/index.ts',
        skipIfExists: true,
        templateFile: '.plop/injectable-index.ts.hbs',
        type: 'add',
      },
      {
        path: 'src/contexts/index.ts',
        separator: '',
        template: `export * from './{{pascalCase name}}Context';\n`,
        type: 'append',
      },
    ],
    description: 'Create a new context',
    prompts: [
      {
        message: `What is your context name (without 'Context')?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
    ],
  });
  plop.setGenerator('endpoint', {
    actions: [
      {
        path: 'src/pages/api/{{kebabCase name}}.ts',
        templateFile: '.plop/API/API.ts.hbs',
        type: 'add',
      },
      {
        path: '__tests__/api/{{kebabCase name}}.test.ts',
        skip: shouldCreate('creating tests', 'createTests'),
        templateFile: '.plop/API/API.test.ts.hbs',
        type: 'add',
      },
    ],
    description: 'Create a new endpoint',
    prompts: [
      {
        message: `What is your endpoint name?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
      {
        default: true,
        message: 'Do you want to create tests for this endpoint?',
        name: 'createTests',
        type: 'confirm',
      },
    ],
  });
  plop.setHelper('eq', (a, b) => a.toString().toLowerCase() === b.toString().toLowerCase());
};
