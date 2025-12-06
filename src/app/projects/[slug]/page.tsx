import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { BASE_URL } from '@/constants/site';
import Project from '@/features/projects/components/project';
import { ProjectProvider } from '@/features/projects/components/project-provider';
import { buildProjectJsonLd, seo } from '@/lib/meta';
import { formatDate } from '@/lib/utils';

import type { Project as ProjectDB } from '.content-collections/generated';
import { allProjects } from '.content-collections/generated';

// Revalidate every hour
export const revalidate = 3600;

const findProjectBySlug = (slug?: string): ProjectDB | undefined =>
  allProjects
    .filter((project) => project.published)
    .find((project) => project.slug === slug);

// Generate static pages at build time for all published projects
export const generateStaticParams = () => {
  return allProjects
    .filter((project) => project.published)
    .map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;
  const project = findProjectBySlug(slug);

  if (!project) return;

  const publishedDate = formatDate(project.date);

  return seo({
    title: project.title,
    description: project.description,
    url: `${ROUTES.projects}/${project.slug}`,
    date: publishedDate,
    openGraph: {
      type: 'article',
      publishedTime: publishedDate,
    },
  });
};

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const project = findProjectBySlug(slug);

  if (!project) return notFound();

  const { title, description, date, stacks, repositoryUrl, image } = project;

  const datePublished = formatDate(date);

  return (
    <ProjectProvider project={project}>
      <Project />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildProjectJsonLd({
            title,
            description,
            datePublished,
            url: `${BASE_URL}${ROUTES.projects}/${slug}`,
            repositoryUrl,
            image: image ? `${BASE_URL}${image}` : undefined,
            technologies: stacks,
          }),
        }}
        key="project-jsonld"
      />
    </ProjectProvider>
  );
};

export default ProjectPage;
