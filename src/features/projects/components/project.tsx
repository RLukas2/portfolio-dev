import ProjectContent from './project-content';
import ProjectHeader from './project-header';
import ProjectThumbnail from './project-thumbnail';

const Project = () => {
  return (
    <div className="relative">
      <ProjectHeader />
      <ProjectThumbnail />
      <ProjectContent />
    </div>
  );
};

export default Project;
