const { paramCase } = require('change-case');
const { readdirSync } = require('fs');

const requireField = (fieldName) => (value) => {
  if (String(value).length === 0) {
    return `${fieldName} is required`;
  }
  return true;
};

const getDirectories = (source) => {
  try {
    return readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error) {
    return [];
  }
};

const getFeature = async (generatorType, inquirer) => {
  const basePrompt = {
    default: false,
    message: `Is the ${generatorType} part of a specific feature?`,
    name: 'isFeature',
    type: 'confirm',
  };

  const { isFeature } = await inquirer.prompt(basePrompt);

  if (!isFeature) {
    return {};
  }

  const featureNamePrompt = {
    message: 'What is the name of the feature?',
    name: 'feature',
    type: 'input',
    validate: requireField('feature'),
  };

  if (baseFeatures.length !== 0) {
    const { isNewFeature } = await inquirer.prompt({
      default: false,
      message: 'Is this a new feature?',
      name: 'isNewFeature',
      type: 'confirm',
    });
    if (!isNewFeature) {
      const featurePrompt = {
        choices: baseFeatures,
        message: 'Which feature is this component part of?',
        name: 'feature',
        type: 'list',
      };
      return await inquirer.prompt(featurePrompt);
    }
  }

  return {
    ...(await inquirer.prompt(featureNamePrompt)),
    isNewFeature: true,
  };
};

const commonDirectory = 'common';
const featuresDirectory = 'features';
const baseFeatures = getDirectories('./src/features');

const newFeatureActions = [
  {
    path: `src/${featuresDirectory}/index.ts`,
    skipIfExists: true,
    templateFile: '.plop/injectable-index.ts.hbs',
    type: 'add',
  },
  {
    path: `src/${featuresDirectory}/index.ts`,
    separator: '',
    template: `export * from './{{pascalCase feature}}';\n`,
    type: 'append',
  },
];

const getFinalPath = (feature) => {
  return feature ? `${featuresDirectory}/${paramCase(feature)}` : commonDirectory;
};

const getDefaultActions = (folder, path) => {
  const directories = getDirectories(path);

  if (!directories.includes(folder)) {
    return [
      {
        path: `src/${path}/index.ts`,
        skipIfExists: true,
        templateFile: '.plop/injectable-index.ts.hbs',
        type: 'add',
      },
      {
        path: `src/${path}/index.ts`,
        separator: '',
        template: `export * from './${folder}';\n`,
        type: 'append',
      },
    ];
  }

  return [];
};

const getFeatureActions = (folder, path, isNewFeature) => {
  const actions = [];
  if (isNewFeature) {
    actions.push(...newFeatureActions);
  }

  if (path) {
    actions.push(...getDefaultActions(folder, path));
  }

  return actions;
};

module.exports = (plop) => {
  plop.setGenerator('component', {
    actions(data) {
      const { feature, hasStories, hasTests, isNewFeature } = data;
      const path = getFinalPath(feature);
      const actions = [
        {
          path: `src/${path}/components/{{pascalCase name}}/{{pascalCase name}}.tsx`,
          templateFile: '.plop/Component/Component.tsx.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/components/{{pascalCase name}}/index.ts`,
          templateFile: '.plop/Component/index.ts.hbs',
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
          template: `export * from './{{pascalCase name}}';\n`,
          type: 'append',
        },
      ];

      actions.push(...getFeatureActions('components', path, isNewFeature));

      if (hasTests) {
        actions.push({
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
          templateFile: '.plop/Component/Component.test.tsx.hbs',
          type: 'add',
        });
      }

      if (hasStories) {
        actions.push({
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
          templateFile: '.plop/Component/Component.stories.tsx.hbs',
          type: 'add',
        });
      }

      return actions;
    },
    description: 'Create a reusable component',
    async prompts(inquirer) {
      const basePrompts = [
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
      ];

      const baseAnswers = await inquirer.prompt(basePrompts);
      const featureAnswers = await getFeature('component', inquirer);

      const childPrompts = [
        {
          default: true,
          message: 'Do you want to create tests for this component?',
          name: 'hasTests',
          type: 'confirm',
        },
        {
          default: true,
          message: 'Do you want to create stories for this component?',
          name: 'hasStories',
          type: 'confirm',
        },
      ];

      const childAnswers = await inquirer.prompt(childPrompts);

      return {
        ...baseAnswers,
        ...featureAnswers,
        ...childAnswers,
      };
    },
  });
  plop.setGenerator('hook', {
    actions(data) {
      const { feature, isNewFeature } = data;
      const path = getFinalPath(feature);
      const actions = [
        {
          path: `src/${path}/hooks/use{{pascalCase name}}.ts`,
          templateFile: '.plop/CustomHook.ts.hbs',
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
          template: `export * from './use{{pascalCase name}}';\n`,
          type: 'append',
        },
      ];

      actions.push(...getFeatureActions('hooks', path, isNewFeature));

      return actions;
    },
    description: 'Create a custom react hook',
    async prompts(inquirer) {
      const basePrompts = [
        {
          message: `What is your hook's name (without 'use')?`,
          name: 'name',
          type: 'input',
          validate: requireField('name'),
        },
      ];

      const baseAnswers = await inquirer.prompt(basePrompts);
      const featureAnswers = await getFeature('hook', inquirer);

      return {
        ...baseAnswers,
        ...featureAnswers,
      };
    },
  });
  plop.setGenerator('reducer', {
    actions(data) {
      const { feature, isNewFeature } = data;
      const path = getFinalPath(feature);
      const actions = [
        {
          path: `src/${path}/reducers/{{kebabCase name}}.reducer.ts`,
          templateFile: '.plop/Reducer.ts.hbs',
          type: 'add',
        },
        {
          path: `src/${path}/reducers/index.ts`,
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
      ];

      actions.push(...getFeatureActions('reducers', path, isNewFeature));

      return actions;
    },
    description: 'Create a custom react reducer',
    async prompts(inquirer) {
      const basePrompts = [
        {
          message: `What is your reducer's name (without 'Reducer')?`,
          name: 'name',
          type: 'input',
          validate: requireField('name'),
        },
      ];

      const baseAnswers = await inquirer.prompt(basePrompts);
      const featureAnswers = await getFeature('reducer', inquirer);

      return {
        ...baseAnswers,
        ...featureAnswers,
      };
    },
  });
  plop.setGenerator('store', {
    actions(data) {
      const { feature, isNewFeature } = data;
      const path = getFinalPath(feature);
      const actions = [
        {
          path: `src/${path}/stores/{{pascalCase name}}Store.ts`,
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
          template: `export * from './{{pascalCase name}}Store';\n`,
          type: 'append',
        },
      ];

      actions.push(...getFeatureActions('stores', path, isNewFeature));

      return actions;
    },
    description: 'Create a new store',
    async prompts(inquirer) {
      const basePrompts = [
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
      ];

      const baseAnswers = await inquirer.prompt(basePrompts);
      const featureAnswers = await getFeature('store', inquirer);

      return {
        ...baseAnswers,
        ...featureAnswers,
      };
    },
  });
  plop.setGenerator('context', {
    actions(data) {
      const { feature, isNewFeature } = data;
      const path = getFinalPath(feature);
      const actions = [
        {
          path: `src/${path}/contexts/{{pascalCase name}}Context.tsx`,
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
          template: `export * from './{{pascalCase name}}Context';\n`,
          type: 'append',
        },
      ];

      actions.push(...getFeatureActions('contexts', path, isNewFeature));

      return actions;
    },
    description: 'Create a new context',
    async prompts(inquirer) {
      const basePrompts = [
        {
          message: `What is your context's name (without 'Context')?`,
          name: 'name',
          type: 'input',
          validate: requireField('name'),
        },
      ];

      const baseAnswers = await inquirer.prompt(basePrompts);
      const featureAnswers = await getFeature('context', inquirer);

      return {
        ...baseAnswers,
        ...featureAnswers,
      };
    },
  });
  plop.setGenerator('page', {
    actions(data) {
      const actions = [
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
      ];

      if (data.createE2e) {
        actions.push({
          path: 'cypress/integration/{{kebabCase name}}/{{kebabCase name}}.spec.ts',
          templateFile: '.plop/Page/Page.spec.ts.hbs',
          type: 'add',
        });
      }

      if (data.hasStories) {
        actions.push({
          path: 'src/stories/{{kebabCase name}}.stories.tsx',
          templateFile: '.plop/Page/Page.stories.tsx.hbs',
          type: 'add',
        });
      }

      return actions;
    },
    description: 'Create a new page',
    prompts: [
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
      {
        default: true,
        message: 'Do you want to create e2e tests for this page?',
        name: 'createE2e',
        type: 'confirm',
      },
      {
        default: true,
        message: 'Do you want to create stories for this page?',
        name: 'hasStories',
        type: 'confirm',
      },
    ],
  });
  plop.setGenerator('endpoint', {
    actions(data) {
      const actions = [
        {
          path: 'src/pages/api/{{kebabCase name}}.ts',
          templateFile: '.plop/API/API.ts.hbs',
          type: 'add',
        },
      ];

      if (data.hasTests) {
        actions.push({
          path: '__tests__/api/{{kebabCase name}}.test.ts',
          templateFile: '.plop/API/API.test.ts.hbs',
          type: 'add',
        });
      }

      return actions;
    },
    description: 'Create a new endpoint',
    prompts: [
      {
        message: `What is your endpoint's name?`,
        name: 'name',
        type: 'input',
        validate: requireField('name'),
      },
      {
        default: true,
        message: 'Do you want to create tests for this endpoint?',
        name: 'hasTests',
        type: 'confirm',
      },
    ],
  });
  plop.setHelper('eq', (a, b) => a.toString().toLowerCase() === b.toString().toLowerCase());
};
