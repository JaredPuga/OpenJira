import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import mongoose from 'mongoose';
import { Entry, IEntry } from '@/models';

type Data = 
 | { message: string }
 | IEntry

export default function handler(req:NextApiRequest, res:NextApiResponse<Data>) {

    const { id } = req.query;

    if ( !mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ID' })
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
            return getEntryById(req, res);
        case 'DELETE':
            return deleteEntry(req, res);
    
        default:
            return res.status(400).json({ message: 'Invalid ID' })
    }
}

const deleteEntry = async (req:NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    
    try {

        await db.connect();

        const entryToDelete = await Entry.findByIdAndDelete(id);

        if ( !entryToDelete ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Entry not found' })
        }
        
        await db.disconnect();
        return res.status(200).json( entryToDelete );
    } catch (error) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({ message: 'Error deleting entry' })
    }


}

const updateEntry = async (req:NextApiRequest, res:NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if ( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Entry not found' })
    }

    const { 
        description = entryToUpdate.description, 
        status = entryToUpdate.status 
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true});
        await db.disconnect();
        res.status(200).json(updatedEntry!);
    } catch (error) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({ message: 'Error updating entry' })
    }
}

const getEntryById = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();
    const entryByID = await Entry.findById(id);
    await db.disconnect();

    if ( !entryByID ) {
        await db.disconnect();
        return res.status(400).json({ message: 'Entry by Id not found' })
    }

    res.status(200).json(entryByID);
}