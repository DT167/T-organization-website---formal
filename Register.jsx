t, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lesson } from '@/entities/Lesson';
import { Registration } from '@/entities/Registration';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

function RegistrationSuccess({ lesson, userName }) {
    return (
        <Card className="w-full max-w-lg bg-gray-800/50 border-gray-700 text-white text-center">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="mt-4 text-2xl text-white">הרשמתך נקלטה בהצלחה!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-right">
                <p>שלום <span className="font-bold text-cyan-400">{userName}</span>, פרטי ההרשמה שלך:</p>
                <div className="p-4 bg-gray-700/50 rounded-lg space-y-2">
                    <p><strong>שיעור:</strong> {lesson.name}</p>
                    <p><strong>תאריך:</strong> {format(new Date(lesson.date), 'd MMMM yyyy', { locale: he })}</p>
                    <p><strong>שעה:</strong> {lesson.time}</p>
                    {lesson.zoomLink && (
                        <p><strong>קישור לזום:</strong> <a href={lesson.zoomLink} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300">לחץ כאן להתחברות</a></p>
                    )}
                </div>
                <Button onClick={() => window.location.href = createPageUrl('Home')} className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold">חזרה לעמוד הבית</Button>
            </CardContent>
        </Card>
    );
}

export default function RegisterPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [userName, setUserName] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, submitting, success, error
    const [error, setError] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const lessonId = params.get('lessonId');
        if (!lessonId) {
            navigate(createPageUrl('Lessons'));
            return;
        }

        const fetchLesson = async () => {
            setStatus('loading');
            try {
                const fetchedLesson = await Lesson.get(lessonId);
                setLesson(fetchedLesson);
                setStatus('idle');
            } catch (e) {
                setStatus('error');
                setError('לא נמצא שיעור תואם.');
            }
        };
        fetchLesson();
    }, [location.search, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userName.trim() || !lesson) return;

        setStatus('submitting');
        try {
            // Re-fetch lesson to get the latest registration count
            const currentLesson = await Lesson.get(lesson.id);
            if ((currentLesson.registrationsCount || 0) >= currentLesson.maxParticipants) {
                setStatus('error');
                setError('השיעור מלא, לא ניתן להירשם.');
                return;
            }

            await Registration.create({
                lessonId: lesson.id,
                lessonName: lesson.name,
                userName: userName.trim()
            });

            await Lesson.update(lesson.id, {
                registrationsCount: (currentLesson.registrationsCount || 0) + 1
            });
            
            setStatus('success');
        } catch (e) {
            console.error(e);
            setStatus('error');
            setError('אירעה שגיאה בתהליך ההרשמה. נסו שוב מאוחר יותר.');
        }
    };

    if (status === 'loading') {
        return <div className="flex justify-center items-center min-h-[70vh]"><Loader2 className="h-16 w-16 text-cyan-400 animate-spin" /></div>;
    }

    return (
        <div className="flex items-center justify-center min-h-[70vh] py-12">
            {status === 'success' ? (
                <RegistrationSuccess lesson={lesson} userName={userName} />
            ) : (
                <Card className="w-full max-w-lg bg-gray-800/50 border-gray-700 text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">הרשמה לשיעור</CardTitle>
                        {lesson && <p className="text-center text-cyan-400 text-lg font-bold">{lesson.name}</p>}
                    </CardHeader>
                    <CardContent>
                        {lesson ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-2">שם מלא</label>
                                    <Input
                                        id="userName"
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="הקלד/י את שמך המלא"
                                        className="bg-gray-700 border-gray-600"
                                        required
                                    />
                                </div>
                                {status === 'error' && (
                                    <div className="text-red-500 text-sm flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4" />
                                        {error}
                                    </div>
                                )}
                                <Button type="submit" disabled={status === 'submitting'} className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold text-lg">
                                    {status === 'submitting' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'אשר הרשמה'}
                                </Button>
                            </form>
                        ) : (
                             <div className="text-center text-red-500">{error || 'טוען פרטי שיעור...'}</div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
