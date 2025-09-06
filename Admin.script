import React, { useState, useEffect } from 'react';
import { Lesson } from '@/entities/Lesson';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogIn, PlusCircle, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

function AdminDashboard() {
    const [lessons, setLessons] = useState([]);

    const loadLessons = async () => {
        const data = await Lesson.list('-created_date');
        setLessons(data);
    };

    useEffect(() => {
        loadLessons();
    }, []);
    
    const [newLesson, setNewLesson] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        zoomLink: '',
        maxParticipants: 10
    });
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewLesson(prev => ({ ...prev, [id]: value }));
    };

    const handleAddLesson = async (e) => {
        e.preventDefault();
        if (!newLesson.name || !newLesson.date || !newLesson.time) {
            alert('שם, תאריך ושעה הם שדות חובה.');
            return;
        }
        await Lesson.create({
            ...newLesson,
            maxParticipants: Number(newLesson.maxParticipants)
        });
        setNewLesson({ name: '', description: '', date: '', time: '', zoomLink: '', maxParticipants: 10 });
        loadLessons();
    };
