# WP Plugin Suggestions

[![GitHub license](https://img.shields.io/github/license/franmastromarino/wp-plugin-suggestions)](https://github.com/franmastromarino/wp-plugin-suggestions/blob/main/LICENSE)

WP Plugin Suggestions is an npm package that simplifies the process of including WordPress plugins in the admin backend. This package is designed for WordPress plugin developers and offers an easy way to display and manage plugin suggestions as cards. Admins can quickly install and activate these plugins directly from the admin dashboard.

## Features

- Query and display WordPress plugins as cards
- Easy installation and activation of plugins
- Simplified management of plugin suggestions in the admin backend
- Supports both custom plugins and other WordPress plugins

## Installation

Install WP Plugin Suggestions using npm:

```bash
npm install wp-plugin-suggestions --save
```

## Usage
Import the WPPluginSuggestions class:

```javascript
import { List as PluginSuggestionsList } from 'wp-plugin-suggestions';
```

Initialize the WPPluginSuggestions instance with the required parameters:

```javascript
<PluginSuggestionsList
  columns="3"
  showName={true}
  showLinks={true}
  showDescription={true}
  showCardFooter={true}
  showUpdated={true}
  showDownloaded={true}
  showCompatibility={true}
>
```
## Contribute to WP Plugin Suggestions

We welcome and appreciate contributions from the community to help improve WP Plugin Suggestions! Here's how you can contribute:

1. Fork the repository: https://github.com/franmastromarino/wp-plugin-suggestions
2. Create a new branch with a descriptive name for your feature, bugfix, or enhancement.
3. Make your changes, following the existing code style and structure.
4. Commit your changes with a clear and concise commit message.
5. Push your branch to your fork on GitHub.
6. Open a pull request against the `main` branch of the original repository.

Before submitting your pull request, please ensure that you have tested your changes thoroughly and that all tests pass. 

Thank you for your interest in contributing to WP Plugin Suggestions!
