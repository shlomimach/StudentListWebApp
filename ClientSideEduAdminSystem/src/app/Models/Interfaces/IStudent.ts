export interface IStudent {
  studentID: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  birthCountry: string;
  gender: string;
  class: string;
  questionnaireStatus?: string;//סטאטוס שאלון
  personalPlanStatus?: string;// סטאטוס תוכנית אישית
  studentStatus: string;
  studentType: string;
  previousIdentificationMessage: string;
  imagePath?: string;
}
