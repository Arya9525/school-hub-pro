export type Status = "Active" | "Inactive" | "Pending";

export type School = {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  contact: string;
  principalName: string;
  principalUsername: string;
  status: Status;
  createdAt: string;
  students: number;
  classes: number;
  sections: number;
};

export const schools: School[] = [
  {
    id: "sch-1",
    name: "St. Francis Secondary School",
    code: "SCH0001",
    address: "12, Church Road",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201001",
    email: "office@stfrancis.edu.in",
    contact: "+91 98110 44521",
    principalName: "Rajesh Verma",
    principalUsername: "SCH0001-A001",
    status: "Active",
    createdAt: "12 Apr 2025",
    students: 1248,
    classes: 12,
    sections: 34,
  },
  {
    id: "sch-2",
    name: "Delhi Public School",
    code: "SCH0002",
    address: "Sector 24, Mathura Road",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110044",
    email: "admin@dpsdelhi.edu.in",
    contact: "+91 98730 11298",
    principalName: "Meera Sharma",
    principalUsername: "SCH0002-A001",
    status: "Active",
    createdAt: "08 Apr 2025",
    students: 2140,
    classes: 12,
    sections: 36,
  },
  {
    id: "sch-3",
    name: "Green Valley Public School",
    code: "SCH0003",
    address: "Rajpur Road, Near Clock Tower",
    city: "Dehradun",
    state: "Uttarakhand",
    pincode: "248001",
    email: "contact@greenvalley.edu.in",
    contact: "+91 90123 77410",
    principalName: "Anil Kapoor",
    principalUsername: "SCH0003-A001",
    status: "Pending",
    createdAt: "02 Apr 2025",
    students: 860,
    classes: 10,
    sections: 22,
  },
  {
    id: "sch-4",
    name: "Sunrise International School",
    code: "SCH0004",
    address: "Sector 62, Block C",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201309",
    email: "hello@sunriseintl.edu.in",
    contact: "+91 99100 63384",
    principalName: "Sunita Patel",
    principalUsername: "SCH0004-A001",
    status: "Active",
    createdAt: "28 Mar 2025",
    students: 1512,
    classes: 12,
    sections: 30,
  },
  {
    id: "sch-5",
    name: "Sarvodaya Vidya Mandir",
    code: "SCH0005",
    address: "Dasna Road",
    city: "Hapur",
    state: "Uttar Pradesh",
    pincode: "245101",
    email: "office@sarvodayavm.edu.in",
    contact: "+91 94567 20115",
    principalName: "Harpreet Kaur",
    principalUsername: "SCH0005-A001",
    status: "Inactive",
    createdAt: "15 Mar 2025",
    students: 604,
    classes: 8,
    sections: 16,
  },
];

export type Principal = {
  id: string;
  name: string;
  username: string;
  school: string;
  email: string;
  phone: string;
  status: Status;
  createdAt: string;
};

export const principals: Principal[] = schools.map((s, i) => ({
  id: `pr-${i + 1}`,
  name: s.principalName,
  username: s.principalUsername,
  school: s.name,
  email: s.email,
  phone: s.contact,
  status: s.status === "Pending" ? "Pending" : s.status,
  createdAt: s.createdAt,
}));

export type SectionRow = { name: string; students: number; teacher: string };
export type ClassRow = { id: string; label: string; sections: SectionRow[] };

const teachers = [
  "Neha Bansal",
  "Vikram Rathore",
  "Shalini Joshi",
  "Arun Nair",
  "Pooja Chandel",
  "Manoj Tiwari",
];

export const classes: ClassRow[] = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1;
  const count = n <= 8 ? 3 : 2;
  return {
    id: `cls-${n}`,
    label: `Class ${n}`,
    sections: Array.from({ length: count }, (_, j) => ({
      name: ["A", "B", "C"][j],
      students: 26 + ((n * 7 + j * 5) % 12),
      teacher: teachers[(n + j) % teachers.length],
    })),
  };
});

export type FeeStructure = {
  id: string;
  year: string;
  className: string;
  amount: number;
  status: "Active" | "Archived";
};

export const feeStructures: FeeStructure[] = [
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `fs-26-${i + 1}`,
    year: "2026-27",
    className: `Class ${i + 1}`,
    amount: 18000 + i * 2000,
    status: "Active" as const,
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `fs-25-${i + 1}`,
    year: "2025-26",
    className: `Class ${i + 1}`,
    amount: 16000 + i * 2000,
    status: "Archived" as const,
  })),
];

export const baseFeeFor = (className: string, year = "2026-27") =>
  feeStructures.find((f) => f.className === className && f.year === year)?.amount ?? 20000;

export type Student = {
  id: string;
  admissionNo: string;
  name: string;
  className: string;
  section: string;
  parentId: string;
  parentName: string;
  admissionDate: string;
  fee: number;
  status: "Paid" | "Partial" | "Pending";
};

const studentNames = [
  "Aarav Sharma",
  "Ishita Verma",
  "Kabir Mehta",
  "Ananya Iyer",
  "Rohan Gupta",
  "Diya Nair",
  "Aditya Rathi",
  "Saanvi Kulkarni",
  "Rahul Kumar",
  "Priya Kumar",
  "Vivaan Chauhan",
  "Meher Sethi",
  "Arjun Yadav",
  "Nitya Bhatt",
  "Kartik Saxena",
  "Tanvi Deshmukh",
  "Devansh Pandey",
  "Ira Malhotra",
  "Yash Thakur",
  "Aisha Siddiqui",
  "Reyansh Jain",
  "Mahira Qureshi",
  "Shaurya Bisht",
  "Pihu Agarwal",
];

const statuses: Student["status"][] = ["Paid", "Partial", "Pending"];

export const students: Student[] = studentNames.map((name, i) => {
  const classNo = (i % 12) + 1;
  const className = `Class ${classNo}`;
  const parentIdx = i % 8;
  return {
    id: `stu-${i + 1}`,
    admissionNo: `ADM-2026-${String(101 + i).padStart(4, "0")}`,
    name,
    className,
    section: ["A", "B", "C"][i % 3],
    parentId: `par-${parentIdx + 1}`,
    parentName: parentNamesSeed[parentIdx],
    admissionDate: `${String((i % 27) + 1).padStart(2, "0")} Jul 2026`,
    fee: baseFeeFor(className),
    status: statuses[i % 3],
  };
});

export type Parent = {
  id: string;
  username: string;
  name: string;
  fatherName: string;
  village: string;
  phone: string;
  email: string;
  status: Status;
  createdAt: string;
};

const parentNamesSeed = [
  "Raj Kumar",
  "Ramesh Mehta",
  "Sunita Verma",
  "Harpreet Singh",
  "Anita Nair",
  "Vikram Gupta",
  "Suresh Chauhan",
  "Kavita Iyer",
];

export const parents: Parent[] = parentNamesSeed.map((name, i) => ({
  id: `par-${i + 1}`,
  username: `SCH0004-P${String(451 + i).padStart(4, "0")}`,
  name,
  fatherName: [
    "Mohan Lal",
    "Devi Prasad",
    "Om Prakash",
    "Gurdeep Singh",
    "Balan Nair",
    "Shyam Gupta",
    "Ram Singh",
    "Krishnan Iyer",
  ][i],
  village: [
    "Dasna",
    "Modinagar",
    "Pilkhuwa",
    "Garhmukteshwar",
    "Simbhaoli",
    "Babugarh",
    "Kharkhoda",
    "Dhaulana",
  ][i],
  phone: `+91 9${String(80000000 + i * 137911).slice(0, 9)}`,
  email: i % 3 === 0 ? "" : `${name.split(" ")[0].toLowerCase()}${i}@gmail.com`,
  status: "Active",
  createdAt: `${String((i % 27) + 1).padStart(2, "0")} Jun 2026`,
}));

export const childrenOf = (parentId: string) => students.filter((s) => s.parentId === parentId);

export type PortalUser = {
  id: string;
  name: string;
  username: string;
  role: "Principal" | "Parent" | "Student";
  status: Status;
  createdAt: string;
};

export const portalUsers: PortalUser[] = [
  ...principals.map((p) => ({
    id: p.id,
    name: p.name,
    username: p.username,
    role: "Principal" as const,
    status: p.status,
    createdAt: p.createdAt,
  })),
  ...parents.map((p) => ({
    id: p.id,
    name: p.name,
    username: p.username,
    role: "Parent" as const,
    status: p.status,
    createdAt: p.createdAt,
  })),
  ...students.slice(0, 10).map((s) => ({
    id: s.id,
    name: s.name,
    username: `SCH0004-S${s.admissionNo.slice(-4)}`,
    role: "Student" as const,
    status: "Active" as const,
    createdAt: s.admissionDate,
  })),
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const academicYears = ["2026-27", "2025-26"];

export type DiscountConfig = {
  siblingTwo: number;
  siblingThreePlusWaiver: boolean;
  staffEnabled: boolean;
  staffPercent: number;
  customAllowed: boolean;
};

export const defaultDiscountConfig: DiscountConfig = {
  siblingTwo: 10,
  siblingThreePlusWaiver: true,
  staffEnabled: true,
  staffPercent: 25,
  customAllowed: true,
};
