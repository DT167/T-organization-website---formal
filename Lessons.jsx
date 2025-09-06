import React, { useState, useEffect } from 'react';
import { Lesson } from '@/entities/Lesson';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

function LessonCard({ lesson }) {
    const availableSpots = lesson.maxParticipants - (lesson.registrationsCount || 0);
    const isFull = availableSpots <= 0;
    const lessonDate = new Date(`${lesson.date}T${lesson.time}`);
    const isPast = lessonDate < new Date();

    return (
        <Card className="bg-gray-800/50 border-gray-700 text-white flex flex-col transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/10">
            <CardHeader>
                <CardTitle className="text-2xl text-cyan-400">{lesson.name}</CardTitle>
                <p className="text-gray-300 h-12 overflow-hidden">{lesson.description}</p>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                    <Calendar className="h-5 w-5 text-cyan-400" />
                    <span>{format(lessonDate, 'EEEE, d MMMM yyyy', { locale: he })}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <Clock className="h-5 w-5 text-cyan-400" />
                    <span>{lesson.time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <Users className="h-5 w-5 text-cyan-400" />
                    <span>{isFull ? 'השיעור מלא' : `${availableSpots} מקומות פנויים מתוך ${lesson.maxParticipants}`}</span>
                </div>
            </CardContent>
            <CardFooter>
                {isPast ? (
                     <Button disabled className="w-full font-bold bg-gray-600">השיעור הסתיים</Button>
                ) : isFull ? (
                    <Button disabled className="w-full font-bold bg-red-500/80">ההרשמה מלאה</Button>
                ) : (
                    <Link to={createPageUrl(`Register?lessonId=${lesson.id}`)} className="w-full">
                        <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold">
                            להרשמה
                            <ArrowLeft className="mr-2 h-4 w-4" />
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
}

export default function LessonsPage() {
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadLessons = async () => {
            setIsLoading(true);
            const allLessons = await Lesson.list('-date');
            const futureLessons = allLessons.filter(l => new Date(`${l.date}T${l.time}`) >= new Date());
            setLessons(futureLessons);
            setIsLoading(false);
        };
        loadLessons();
    }, []);

    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white">השיעורים שלנו</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
                        מצאו את השיעור המתאים לכם והירשמו עוד היום. המקומות מוגבלים!
                    </p>
                </div>

                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-full px-6 py-2">
                        <p className="font-semibold">לימודי 10 יחידות לימוד באלקטרוניקה ומחשבים</p>
                    </div>
                    <div className="inline-block bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full px-6 py-2 ml-4">
                        <p className="font-semibold">תגבורים במקצועות השפה העברית - 2 יחידות לימוד</p>
                    </div>
                </div>
                
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-16 w-16 text-cyan-400 animate-spin" />
                    </div>
                ) : lessons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {lessons.map(lesson => (
                            <LessonCard key={lesson.id} lesson={lesson} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 bg-gray-800/50 p-10 rounded-lg">
                        <h2 className="text-2xl text-white mb-2">אין שיעורים זמינים כרגע</h2>
                        <p>נא לחזור ולהתעדכן בקרוב!</p>
                    </div>
                )}
            </div>
        </div>
