# Changelog

## [1.3.0](https://github.com/RLukas2/portfolio-dev/compare/v1.2.0...v1.3.0) (2025-12-06)


### Features

* **analytics:** add Google Analytics integration with page tracking ([e0a3376](https://github.com/RLukas2/portfolio-dev/commit/e0a337664c4b23877d85245a905e5486de3de93b))
* **card:** add Card component ([f5965aa](https://github.com/RLukas2/portfolio-dev/commit/f5965aa3bf4fb2ff14f03d585c5a55796b47e8cb))
* **content:** restore soft-deleted ContentMeta on engagement actions ([98687d6](https://github.com/RLukas2/portfolio-dev/commit/98687d6daa61376ea62e54a5114884dab5d93412))
* **contributions:** add className prop for customizable styling ([4091954](https://github.com/RLukas2/portfolio-dev/commit/4091954041a25afe30bf1e0170190e5b09978239))
* **discover-widget:** add DiscoverWidget component for project discovery links ([ee03e1c](https://github.com/RLukas2/portfolio-dev/commit/ee03e1c9e6dcdb548bfd33b00cfc94c159f6d24c))
* enhance SEO and PWA configuration with improved metadata ([336bcea](https://github.com/RLukas2/portfolio-dev/commit/336bcead4a8b15d42025b07d389a5cfa3f538783))
* **featured-widget:** replace div with Link component for improved navigation ([920a6ed](https://github.com/RLukas2/portfolio-dev/commit/920a6ed7b31c4359866b392ee520e5f45f5d45dd))
* **home:** integrate WidgetGrid component and update navigation anchors ([9948dd0](https://github.com/RLukas2/portfolio-dev/commit/9948dd007adc1c3f1a60ae937f0596c85f1e520f))
* **location-widget:** add LocationWidget component with dynamic map loading ([de82efd](https://github.com/RLukas2/portfolio-dev/commit/de82efd0e3f37e82bc221be639d72632625e2b07))
* **now-playing:** add dedicated API endpoint for last-played track fallback ([1eca219](https://github.com/RLukas2/portfolio-dev/commit/1eca2197bbe775d6a3e3869326f99ddf15370a46))
* **now-playing:** add recently played track fallback when nothing is currently playing ([569450d](https://github.com/RLukas2/portfolio-dev/commit/569450d530e8e834cdfbe360c8f088d733efb848))
* **posts:** implement smart related posts ([67fb8b1](https://github.com/RLukas2/portfolio-dev/commit/67fb8b1364cc919cad8c3997266d856223736805))
* **resume:** add experience entry for Le Hong Phong Online Judge and update jobType options ([c5e0ec0](https://github.com/RLukas2/portfolio-dev/commit/c5e0ec04292048a981a43b15e4291eb8e81fe454))
* **resume:** modularize resume page with dedicated component sections ([6a1536a](https://github.com/RLukas2/portfolio-dev/commit/6a1536a64e7fa0b9af24d355b79bf1e077722fea))
* **sandbox:** add WidgetGrid component and integrate into SandboxPage ([285ee04](https://github.com/RLukas2/portfolio-dev/commit/285ee04e435d3680f36275df050262f8b486a675))
* **security:** allow connections from all origins in Content Security Policy ([742bfdf](https://github.com/RLukas2/portfolio-dev/commit/742bfdfaa9492357262e1176ba811d548e8c5470))
* **seo:** move og and twitter images to home page metadata ([1e5f704](https://github.com/RLukas2/portfolio-dev/commit/1e5f704f609c5b179adbd84a5a3b3d5fd447b471))
* **social-widget:** add SocialWidget component for external links with icons ([d9a62e2](https://github.com/RLukas2/portfolio-dev/commit/d9a62e26c757e65461acb7d560af9b826652fd9d))
* **spotify-widget:** add SpotifyWidget component to WidgetGrid ([6cc08c5](https://github.com/RLukas2/portfolio-dev/commit/6cc08c5a562c585a07c15986e128db1c194cdfc1))
* **techstack-widget:** add TechStackWidget component with marquee effect for displaying skills ([af3ee07](https://github.com/RLukas2/portfolio-dev/commit/af3ee076d9ab2e90eff4a7d7bdc2b77777c15fff))
* **ui:** add 'wide' variant to Badge and 'xl' size to Button components ([573ba78](https://github.com/RLukas2/portfolio-dev/commit/573ba784be0f7bc308fb3151dbf4752c360e8b50))
* **widget-grid:** add FeaturedWidget to WidgetGrid for enhanced portfolio display ([2d95e07](https://github.com/RLukas2/portfolio-dev/commit/2d95e076ce3dad3a6f7ca77280c70c21ce699b92))
* **widget-grid:** integrate DiscoverWidget and SocialWidget ([b8f220c](https://github.com/RLukas2/portfolio-dev/commit/b8f220c3503c6dcdbbb36b74efb01a2f5d2ab822))
* **widget-grid:** integrate GitHubWidget into the WidgetGrid component ([243fa79](https://github.com/RLukas2/portfolio-dev/commit/243fa79a867061581a74f9b5ad9edb81a58b0221))
* **widget-grid:** integrate LocationWidget into WidgetGrid component ([fc6ca41](https://github.com/RLukas2/portfolio-dev/commit/fc6ca411c318b4292803d8a8cbf2e1d9c652561e))
* **widget-grid:** integrate TypingWidget and update widget labels ([2dc2f8d](https://github.com/RLukas2/portfolio-dev/commit/2dc2f8d49dc0f9551abcfc28e180b0506b8480ff))
* **widget:** add TypingWidget component and constants for social links ([4841df9](https://github.com/RLukas2/portfolio-dev/commit/4841df94b7d773a093220faeef1749ff01839887))


### Bug Fixes

* **card:** add overflow hidden to card content for better layout handling ([7adbfe4](https://github.com/RLukas2/portfolio-dev/commit/7adbfe4ece7d5851860f97d757a7f337c5d19a92))
* **header:** update z-index value for header to improve stacking context ([1aa4380](https://github.com/RLukas2/portfolio-dev/commit/1aa4380693bd2decc58760e11891f3ba22341333))
* **sitemap:** handle absolute URLs in image paths ([2ddaad3](https://github.com/RLukas2/portfolio-dev/commit/2ddaad3b7f527ec77456ec27d2534fbde281aed1))
* **sitemap:** remove image entries from sitemap routes ([8de2be4](https://github.com/RLukas2/portfolio-dev/commit/8de2be4148c84ee5bc9ebb16ba61a0a4dadc4b3b))
* **social-links:** update icon size for Facebook, Twitter, and LinkedIn for consistency ([a8aef8d](https://github.com/RLukas2/portfolio-dev/commit/a8aef8d7551f069ecfb7ee818937e514166389cd))
* **typing-widget:** adjust WPM display size for better readability ([2a96db8](https://github.com/RLukas2/portfolio-dev/commit/2a96db8bc52075f45531158a006daa2b85528c07))
* **widget-grid:** replace Card with div for LocationWidget to improve layout structure ([e2b6960](https://github.com/RLukas2/portfolio-dev/commit/e2b696043195b6b89fabed3def78672f67906f75))


### Performance Improvements

* **analytics:** defer analytics loading with lazyOnload strategy ([8cce6d0](https://github.com/RLukas2/portfolio-dev/commit/8cce6d0e7d7cb65cc189f7e0784298505ebc5187))
* **content-card:** add responsive image sizes for optimized loading ([785a1f4](https://github.com/RLukas2/portfolio-dev/commit/785a1f4faa9c328b97bb829ce7db57887242b03d))
* **home:** optimize hero animations and replace motion.div with CSS animation ([cd48458](https://github.com/RLukas2/portfolio-dev/commit/cd484587e231e1a5bc0021b6b8896eadd33db56b))
* **image-optimization:** reduce profile image quality and add responsive qualities ([ac3a924](https://github.com/RLukas2/portfolio-dev/commit/ac3a9248573f898efa634cbfc63b47df22a1b4c7))
* optimize image loading ([b98aaee](https://github.com/RLukas2/portfolio-dev/commit/b98aaee9fa916586a9ef24eecfcddf425edc211e))
* **profile-image:** optimize image loading and quality settings ([501d7c7](https://github.com/RLukas2/portfolio-dev/commit/501d7c7a8034ee1b2441d3f4629acf5710a51a55))

## [1.2.0](https://github.com/RLukas2/portfolio-dev/compare/v1.1.0...v1.2.0) (2025-12-02)

### Features

- add comprehensive analytics and content management features ([af1428f](https://github.com/RLukas2/portfolio-dev/commit/af1428f05b4b3dcf61504ba654fe1199e57ad146))
- add content helper functions for content ([4c017ef](https://github.com/RLukas2/portfolio-dev/commit/4c017ef5377f4790a7572078c64213f58a1a51f0))
- add empty migration for soft deletes and consistent naming ([cbde3d2](https://github.com/RLukas2/portfolio-dev/commit/cbde3d2f997c559c3b3753aceb82c983e19204a3))
- add JSON-LD schemas for Person and Website ([6a4be74](https://github.com/RLukas2/portfolio-dev/commit/6a4be74830eda25f7f93654d7bfadb2788ad5fbb))
- add maimai adventure blog post and accompanying images ([acadc89](https://github.com/RLukas2/portfolio-dev/commit/acadc89d1dfb215d413641c8922b5a6ede6f6468))
- add minimum height and width to Button component ([5435112](https://github.com/RLukas2/portfolio-dev/commit/543511235e381dca151cd97517f0e8dddca74065))
- add NowSection component and improve aboutMe ([bef2ca5](https://github.com/RLukas2/portfolio-dev/commit/bef2ca526b33c3ea90484e1e8acbe4a613ef3b27))
- add print styles and hide non-essential elements for print layout ([a5b10a1](https://github.com/RLukas2/portfolio-dev/commit/a5b10a1829ca573aa5441f0453779edfd030a43c))
- add reusable content card components and image metadata hook ([0a2a4d2](https://github.com/RLukas2/portfolio-dev/commit/0a2a4d20fd5e650b62ebf76de55632bce5ee98f9))
- add SectionDivider component ([a85bc41](https://github.com/RLukas2/portfolio-dev/commit/a85bc41e5b4c6b4477b6c592afa1babc9e2e8c02))
- add social button to GetInTouch component ([db3c70f](https://github.com/RLukas2/portfolio-dev/commit/db3c70f3891d3a50e1f87f196b0dc2da82b22b5c))
- enhance code highlighting and diff view styles in MDX components ([312cf05](https://github.com/RLukas2/portfolio-dev/commit/312cf05b6091bcc4359d850adb135e7877d264bb))
- enhance data models with new fields and relationships ([135dad7](https://github.com/RLukas2/portfolio-dev/commit/135dad75805ffd1a3be0235f36a866a981291b54))
- implement base content schema ([d5f781b](https://github.com/RLukas2/portfolio-dev/commit/d5f781bf94357b4dc300ec47d0c716c821156698))
- implement reusable ContentDetailLoading component ([a2006df](https://github.com/RLukas2/portfolio-dev/commit/a2006df4f388e4e11c94bc0bef3b6632a9c8d2b1))
- implement useAsyncAction hook ([38bcf11](https://github.com/RLukas2/portfolio-dev/commit/38bcf1109a775281b4aff37e7d940fa2b5f54f81))
- mark heading hierarchy as complete in to-do list ([e5d3f97](https://github.com/RLukas2/portfolio-dev/commit/e5d3f975fd0dc39477c11359eb7aad31be722745))

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
