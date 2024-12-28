import { Patient } from '@/lib/types/patient';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    step1Completed: true,
    step2Completed: true,
    step3Completed: true,
    step4Completed: false,
    step5Completed: false,
    step6Completed: false,
  },
  {
    id: '2',
    name: 'Jane Smith',
    step1Completed: true,
    step2Completed: true,
    step3Completed: true,
    step4Completed: true,
    step5Completed: true,
    step6Completed: true,
  },
  {
    id: '3',
    name: 'Robert Johnson',
    step1Completed: true,
    step2Completed: false,
    step3Completed: false,
    step4Completed: false,
    step5Completed: false,
    step6Completed: false,
  },
];