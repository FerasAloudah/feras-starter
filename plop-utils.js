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

const commonDirectory = 'common';
const featuresDirectory = 'features';
const e2eTestsDirectory = 'cypress/integration';
const testsDirectory = '__tests__';
const storiesDirectory = '__stories__';
const baseFeatures = getDirectories('./src/features');

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
        message: `Which feature is this ${generatorType} part of?`,
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
    template: `export * from './{{kebabCase feature}}';\n`,
    type: 'append',
  },
];

const getFinalPath = (feature) => {
  return feature ? `${featuresDirectory}/${paramCase(feature)}` : commonDirectory;
};

const getDefaultActions = (folder, path) => {
  const directories = getDirectories(`./src/${path}`);

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

const setGeneratorWithDefaults = ({
  baseActions = [],
  basePrompts = [],
  configOverride = {},
  description,
  folder,
  name,
  plop,
  storiesTemplate,
  namePrefix = '',
  nameSuffix = '',
  testsTemplate,
  e2eTestsTemplate,
  pathOverride = false,
}) => {
  const prompts = async (inquirer) => {
    const baseAnswers = await inquirer.prompt(basePrompts);
    const featureAnswers = pathOverride ? [] : await getFeature(name, inquirer);

    const childPrompts = [];

    if (testsTemplate) {
      childPrompts.push({
        default: true,
        message: `Do you want to create tests for this ${name}?`,
        name: 'hasTests',
        type: 'confirm',
      });
    }

    if (e2eTestsTemplate) {
      childPrompts.push({
        default: true,
        message: `Do you want to create e2e tests for this ${name}?`,
        name: 'hasE2eTests',
        type: 'confirm',
      });
    }

    if (storiesTemplate) {
      childPrompts.push({
        default: true,
        message: `Do you want to create stories for this ${name}?`,
        name: 'hasStories',
        type: 'confirm',
      });
    }

    const childAnswers = await inquirer.prompt(childPrompts);

    return {
      ...baseAnswers,
      ...childAnswers,
      ...featureAnswers,
    };
  };

  const actions = (data) => {
    const { feature, hasE2eTests, hasStories, hasTests, isNewFeature } = data;
    const path = pathOverride ? folder : getFinalPath(feature);
    data.path = path;

    const actions = typeof baseActions === 'function' ? baseActions(path) : baseActions;

    if (!pathOverride) {
      actions.push(...getFeatureActions(folder, path, isNewFeature));
    }

    if (hasTests) {
      actions.push({
        path: `${testsDirectory}/${path}/${
          pathOverride ? '' : folder + '/'
        }${namePrefix}{{kebabCase name}}${nameSuffix}.test.ts${name === 'component' || name === 'context' ? 'x' : ''}`,
        templateFile: testsTemplate,
        type: 'add',
      });
    }

    if (hasE2eTests) {
      actions.push({
        path: `${e2eTestsDirectory}/${namePrefix}{{kebabCase name}}${nameSuffix}.spec.ts`,
        templateFile: e2eTestsTemplate,
        type: 'add',
      });
    }

    if (hasStories) {
      actions.push({
        path: `${storiesDirectory}/${path}/${namePrefix}{{kebabCase name}}${nameSuffix}.stories.tsx`,
        templateFile: storiesTemplate,
        type: 'add',
      });
    }

    return actions;
  };

  plop.setGenerator(name, {
    actions,
    description,
    prompts,
    ...configOverride,
  });
};

module.exports = {
  commonDirectory,
  featuresDirectory,
  getDefaultActions,
  getDirectories,
  getFeature,
  getFeatureActions,
  getFinalPath,
  newFeatureActions,
  paramCase,
  readdirSync,
  requireField,
  setGeneratorWithDefaults,
  storiesDirectory,
  testsDirectory,
};
