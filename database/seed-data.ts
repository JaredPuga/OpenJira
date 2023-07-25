
interface seedData {
    entries: seedEntry[];
}

interface seedEntry {
    description: string;
    createdAt: number;
    status: string;
}

export const seedData:seedData = {
    entries: [
        {
            description: 'Pendiente: lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            description: 'In-Progress: lorem ipsum dolor sit amet consectetur dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! adipisicing elit. Quisquam, voluptatum!',
            createdAt: Date.now() - 10000000,
            status: 'in-progress'
        },
        {
            description: 'Terminadas: lorem ipsum consectetur adipisicing elit. Quisquam, voluptatum! dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
            createdAt: Date.now() - 100000,
            status: 'finished'
        },
    ]
}