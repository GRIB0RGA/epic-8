import { Member } from './member.model';

export interface Practitioner extends Member {
  practiceName: string;
  practiceNo: string;
}
