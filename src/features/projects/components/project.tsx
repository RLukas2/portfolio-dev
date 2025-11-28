import ProjectContent from './project-content';
import ProjectHeader from './project-header';
import ProjectThumbnail from './project-thumbnail';

const Project = () => {
  return (
    <>
      {/* Hero Image */}
      <ProjectThumbnail />

      {/* Project Details */}
      <ProjectHeader />

      {/* Reading Section */}
      <ProjectContent />
    </>
  );
};

export default Project;
