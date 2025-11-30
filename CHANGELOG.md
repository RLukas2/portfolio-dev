# Changelog

## [1.1.0](https://github.com/RLukas2/portfolio-dev/compare/v1.0.0...v1.1.0) (2025-11-30)

### Features

- add cache control headers for static assets and images ([42fe16b](https://github.com/RLukas2/portfolio-dev/commit/42fe16b76d0c23e827f6c734934226d1309cfd4e))
- add caching for pnpm store in GitHub Actions workflow ([934c969](https://github.com/RLukas2/portfolio-dev/commit/934c96944f6cb597ba9d3c1faf23286bb7dd367a))
- add remark plugin to extract headings from MDX ([379ea4f](https://github.com/RLukas2/portfolio-dev/commit/379ea4f3d618f3867de2eeb3b2a3a2a44abd60e9))
- implement content filtering and sorting hooks for posts and shorts ([7e14457](https://github.com/RLukas2/portfolio-dev/commit/7e144578c24c435aa4167e565d502880045559cc))
- improve resume components ([836095a](https://github.com/RLukas2/portfolio-dev/commit/836095a38bebcef8dae70eddb9106abd7ed5197e))
- optimize font loading and reduce delay and duration in Hero ([8566f4e](https://github.com/RLukas2/portfolio-dev/commit/8566f4e8e9bbe949a1464911e779dfc18b6af699))
- update blog post visibility and enhance layout styling ([5353395](https://github.com/RLukas2/portfolio-dev/commit/5353395ce7fb8d553b5889bff2dafbcb01ff0d02))

### Bug Fixes

- replace toSorted to support older browser ([daf0cd3](https://github.com/RLukas2/portfolio-dev/commit/daf0cd35872bfd8c2c95dd57b02cde9ec7eb6e5e))
- timer memory leaks in flip-words ([25b3b7f](https://github.com/RLukas2/portfolio-dev/commit/25b3b7fced343b506f436d61bca38a3aea82bffa))
- update lastmod dates and correct loc paths in sitemap ([4fd03bd](https://github.com/RLukas2/portfolio-dev/commit/4fd03bda8d91f2f492ed07af52c972382e32f35c))

## 1.0.0 (2025-11-30)

### Features

- add baseline-browser-mapping dependency and update version to 2.8.32 ([c3c594b](https://github.com/RLukas2/portfolio-dev/commit/c3c594b74f3adc57ea42f2fce7a488b52055abfc))
- add ConsoleMessage component for console logging and user engagement ([0eeeb99](https://github.com/RLukas2/portfolio-dev/commit/0eeeb9928225498820a73b2b1a7e16ebb8cb03b2))
- add dynamic imports for components ([c2c6a2e](https://github.com/RLukas2/portfolio-dev/commit/c2c6a2e1e5d0ed77b78a15de60972bdae67d8f96))
- add Facebook icon and links to navigation and footer ([99d2473](https://github.com/RLukas2/portfolio-dev/commit/99d24737acc18805f9130b8f33346a76ca2ba918))
- add icons for estimated reading time and views in PostCard and PostHeader components ([b60b2c3](https://github.com/RLukas2/portfolio-dev/commit/b60b2c31dff4a44c9c712bc3137cbb717caf3ac9))
- add image for E2EE Signal project and update reference in MDX file ([83407bd](https://github.com/RLukas2/portfolio-dev/commit/83407bd6ada11d9952887efd1eafaa2e140f7c75))
- add MDX content collection and KaTeX support ([58b45d2](https://github.com/RLukas2/portfolio-dev/commit/58b45d2fdaa5a4d4904d0612481fa28a037914a0))
- add new PostCSS plugins for enhanced CSS processing and optimization ([dac4330](https://github.com/RLukas2/portfolio-dev/commit/dac43308e79fe8490e5ccaa1bca91fd21fdceae8))
- add new tech stack icons for C++, Docker, Express, Gin, MongoDB, and Postman ([188647c](https://github.com/RLukas2/portfolio-dev/commit/188647cfd1c3e711692d567f09a47d87b0ad0a4d))
- add react-icons package for improved icon support ([7bd3bb0](https://github.com/RLukas2/portfolio-dev/commit/7bd3bb07a1bcce6fa6d6a84d0da24021f2309899))
- add sitemap2.xml for Google Search Console ([b81250e](https://github.com/RLukas2/portfolio-dev/commit/b81250e96c304b4436067f8bb9adb5670ffc4518))
- add table of contents component ([7953325](https://github.com/RLukas2/portfolio-dev/commit/7953325feec17ba96f229648eea25d1b112a94ca))
- add Vercel Speed Insights ([0da8686](https://github.com/RLukas2/portfolio-dev/commit/0da8686fc9f3f52564d95f0abba7339486744c5d))
- configure lint-staged to format before commit ([1cf4982](https://github.com/RLukas2/portfolio-dev/commit/1cf4982d721397fef0886916f51db55eee04fd9b))
- enable CSS optimization in Next.js configuration and add 'beasties' dependency ([20a1cc7](https://github.com/RLukas2/portfolio-dev/commit/20a1cc79f327fabf484a27256b75fdf9358d7f1e))
- enhance layout components with wide prop ([ebc21e8](https://github.com/RLukas2/portfolio-dev/commit/ebc21e85d53de5a128612ced08680a0a778b21d4))
- enhance project and post components with improved layouts and functionality ([966b9ba](https://github.com/RLukas2/portfolio-dev/commit/966b9ba98e4dbc924cf721546ee3951453112c10))
- enhance sitemap generation with project URLs and update change frequencies ([d1830b6](https://github.com/RLukas2/portfolio-dev/commit/d1830b693e102067c7b65290320342fd693b270a))
- implement content components for posts and projects, replacing previous structure ([c3876f6](https://github.com/RLukas2/portfolio-dev/commit/c3876f6f1191e7bd1edc7539c343db342cf1b0a4))
- implement error handling components with Sentry integration ([6669e73](https://github.com/RLukas2/portfolio-dev/commit/6669e731856ba5c40d6cc4cf2af033eb8e030f65))
- implement project page components including header, content, and thumbnail ([b4343dc](https://github.com/RLukas2/portfolio-dev/commit/b4343dc8ef0d75865eb0aa55e753654ee4e19837))
- improve Table of Contents component for mobile ([7554e96](https://github.com/RLukas2/portfolio-dev/commit/7554e96ffdbb8dde54f141f9fadee149b729787d))
- lazy load heavy client components to improve initial bundle size ([fc642da](https://github.com/RLukas2/portfolio-dev/commit/fc642da578558a140cf29295905dafdbe536af22))
- publish blog post and refactor blog page with new content component ([a0ecd08](https://github.com/RLukas2/portfolio-dev/commit/a0ecd080c694457957486aafdd45718605fbaa21))
- refactor snippets to shorts, update related components and routes ([2854478](https://github.com/RLukas2/portfolio-dev/commit/285447894ae6755858dd0d00389b4c9d0137dff4))
- update blog list features with advanced filtering and improved card design ([b250c19](https://github.com/RLukas2/portfolio-dev/commit/b250c1931110ae784ab71bbb191ad19721840b5f))
- update layout of LatestPosts component for improved spacing ([7562344](https://github.com/RLukas2/portfolio-dev/commit/75623445af5924b55e880e1cd5e0f3f95e46e194))
- update project and post components by improving layouts ([baf3b85](https://github.com/RLukas2/portfolio-dev/commit/baf3b8524dcd3f72f3c5c25668118d1b866a78a5))
- update project metadata and improve ProjectCard layout with repository links ([4d6b758](https://github.com/RLukas2/portfolio-dev/commit/4d6b758a9cc9292e7b6b1bc4e33c075f9431e3b9))
- update resume and personal projects ([7dbf599](https://github.com/RLukas2/portfolio-dev/commit/7dbf5999e9c42705623243c748db56017bd3c5b1))
- update ShortCard styles for improved layout and responsiveness ([e3c6f8d](https://github.com/RLukas2/portfolio-dev/commit/e3c6f8d8c5402ff127f01ffc9d7dedf24dc5cac6))
- update shorts collection import and add shorts configuration ([fe2adf7](https://github.com/RLukas2/portfolio-dev/commit/fe2adf7656ec07505bba7ae47825230da1103c4a))

### Bug Fixes

- add gap between artist and title in NowPlayingBar component ([11c4764](https://github.com/RLukas2/portfolio-dev/commit/11c47646b2e4f19182dceba39387b0b3a031b556))
- adjust layout classes in ProjectCard component for better responsiveness ([a7de66d](https://github.com/RLukas2/portfolio-dev/commit/a7de66d56ac4766a3f85e12bc5cdb64cefc4894c))
- Cannot build due to css issue ([b11e900](https://github.com/RLukas2/portfolio-dev/commit/b11e90037a636ec452744e86630327d9715fb1f8))
- ensure derivedUrl includes NEXT_PUBLIC_APP_URL for accurate environment configuration ([bfd7914](https://github.com/RLukas2/portfolio-dev/commit/bfd791449ab73f6a0a7406f1b2ff4e077d7b6c77))
- guestbook auth use github for both. ([fc2803e](https://github.com/RLukas2/portfolio-dev/commit/fc2803e5cd58c1824a5b221757fd766bf7f8eb45))
- Ignore prettier used on package or lock files. ([42e3640](https://github.com/RLukas2/portfolio-dev/commit/42e3640d01acdc2ae6bc5aff2ac51c61a086e297))
- remove '/resume' from disallowed paths in robots.txt ([5a7b011](https://github.com/RLukas2/portfolio-dev/commit/5a7b0116cc0736a09cb717deac6214f2418fcd00))
- remove duplicate entry for next-env.d.ts in .prettierignore ([db4b55b](https://github.com/RLukas2/portfolio-dev/commit/db4b55ba92913a0c49a3f4fc1c4189ad3a48c5ea))
- remove trailing comma in URL construction for sitemap routes ([179e666](https://github.com/RLukas2/portfolio-dev/commit/179e6663744c10179399947d3831c3158d7d6c4f))
- remove unncessary build:content. ([a1d2efc](https://github.com/RLukas2/portfolio-dev/commit/a1d2efcd72921a7f68f185b16b9aa227e5e57a73))
- remove unnecessary blank line in use-copy-button hook ([ca9931c](https://github.com/RLukas2/portfolio-dev/commit/ca9931c7eeac4f29fa247e361f0d953901a89d3b))
- Update environment variable name and correct database provider in migration files ([37b5168](https://github.com/RLukas2/portfolio-dev/commit/37b5168033e9379e93238036cfee184acd3cff02))
- update link in LatestPosts component to point to blog instead of projects ([3d5fcbd](https://github.com/RLukas2/portfolio-dev/commit/3d5fcbdffaa12a56679be4ef47de89c70fa7e7e8))
- update links and IDs in CodingInsights and pair-devices components ([1fb1f71](https://github.com/RLukas2/portfolio-dev/commit/1fb1f71c0affc13be2c2986a739ef5f9ac0796f4))
- update proxy matcher to exclude api/auth routes ([61511c5](https://github.com/RLukas2/portfolio-dev/commit/61511c5e55f9d6ba1329f072b0c28466c9363295))
- update type references in toast component for better type safety ([cd379af](https://github.com/RLukas2/portfolio-dev/commit/cd379afb7e9f86689c5a0d283af612a4687bb9a9))
