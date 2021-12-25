const requireField = (fieldName) => {
  return (value) => {
    if (String(value).length === 0) {
      return fieldName + ' is required';
    }
    return true;
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
        templateFile: '.plop/Component/Component.test.tsx.hbs',
        type: 'add',
      },
      {
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
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
        templateFile: '.plop/Page/Page.stories.tsx.hbs',
        type: 'add',
      },
      {
        path: 'cypress/integration/{{kebabCase name}}/{{kebabCase name}}.spec.ts',
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
    ],
  });
};
