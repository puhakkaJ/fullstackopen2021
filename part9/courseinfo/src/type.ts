export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  
export interface CoursePartExt extends CoursePartBase {
    description?: string;
  }

export interface CourseNormalPart extends CoursePartExt {
    type: "normal";
  }

export interface CourseProjectPart extends CoursePartExt {
    type: "groupProject";
    groupProjectCount: number;
  }
  
export interface CourseSubmissionPart extends CoursePartExt {
    type: "submission";
    exerciseSubmissionLink: string;
  }

export interface CourseSpecialPart extends CoursePartExt {
    type: "special";
    requirements: string[];
  }
  
export interface HeaderProps {
    name: string
  }

export interface ContentProps {
    content: CoursePart[]
  }

export interface TotalProps {
    total: number
  }

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
