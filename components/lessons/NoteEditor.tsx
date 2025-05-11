'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { UserNote } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit2, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface NoteEditorProps {
  courseId: string;
  lessonId: string;
}

export function NoteEditor({ courseId, lessonId }: NoteEditorProps) {
  const { notes, addNote, updateNote, deleteNote, getLessonNotes } = useStore();
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  
  const lessonNotes = getLessonNotes(courseId, lessonId);
  
  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;
    
    addNote(courseId, lessonId, newNoteContent);
    setNewNoteContent('');
    toast.success('Note saved');
  };
  
  const startEditing = (note: UserNote) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };
  
  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditContent('');
  };
  
  const saveEdit = (noteId: string) => {
    if (!editContent.trim()) return;
    
    updateNote(noteId, editContent);
    setEditingNoteId(null);
    setEditContent('');
    toast.success('Note updated');
  };
  
  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    toast.success('Note deleted');
  };
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium">My Notes</h3>
      
      <div className="border rounded-lg overflow-hidden bg-card">
        <Textarea
          placeholder="Take notes on this lesson..."
          className="border-0 focus-visible:ring-0 resize-none"
          rows={3}
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
        />
        <div className="p-2 border-t bg-muted/30 flex justify-end">
          <Button size="sm" onClick={handleAddNote}>Save Note</Button>
        </div>
      </div>
      
      {lessonNotes.length > 0 && (
        <div className="space-y-4">
          {lessonNotes.map((note: UserNote) => (
            <div key={note.id} className="border rounded-lg overflow-hidden bg-card">
              {editingNoteId === note.id ? (
                <>
                  <Textarea
                    className="border-0 focus-visible:ring-0 resize-none"
                    rows={3}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="p-2 border-t bg-muted/30 flex justify-end space-x-2">
                    <Button size="sm" variant="outline" onClick={cancelEditing}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => saveEdit(note.id)}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 whitespace-pre-wrap">{note.content}</div>
                  <div className="p-2 border-t bg-muted/30 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => startEditing(note)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteNote(note.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      
      {lessonNotes.length === 0 && newNoteContent === '' && (
        <div className="text-sm text-muted-foreground italic">
          No notes for this lesson yet. Use the form above to add notes.
        </div>
      )}
    </div>
  );
}