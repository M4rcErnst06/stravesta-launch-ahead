
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Calendar as CalendarIcon, Filter, TrendingUp, AlertCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { format, isSameDay, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { de } from 'date-fns/locale';

interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  importance: 'low' | 'medium' | 'high';
  actual?: string;
  forecast?: string;
  previous?: string;
  category: string;
  description: string;
  date: Date;
}

const EconomicCalendar = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [importanceFilter, setImportanceFilter] = useState<string>('all');
  const [currencyFilter, setCurrencyFilter] = useState<string>('all');

  // Mock data - in a real app, this would come from an API
  const [events, setEvents] = useState<EconomicEvent[]>([
    {
      id: '1',
      time: '08:30',
      currency: 'USD',
      event: 'Non-Farm Payrolls',
      importance: 'high',
      actual: '263K',
      forecast: '250K',
      previous: '236K',
      category: 'Employment',
      description: 'Monatliche Beschäftigungsdaten der USA',
      date: new Date()
    },
    {
      id: '2',
      time: '10:00',
      currency: 'EUR',
      event: 'EZB Zinsentscheidung',
      importance: 'high',
      forecast: '4.25%',
      previous: '4.00%',
      category: 'Central Bank',
      description: 'Europäische Zentralbank Leitzinsentscheidung',
      date: new Date()
    },
    {
      id: '3',
      time: '14:15',
      currency: 'USD',
      event: 'Industrial Production',
      importance: 'medium',
      forecast: '0.3%',
      previous: '0.1%',
      category: 'Economic Activity',
      description: 'Industrieproduktion der USA',
      date: addDays(new Date(), 1)
    },
    {
      id: '4',
      time: '09:00',
      currency: 'GBP',
      event: 'GDP Growth Rate',
      importance: 'high',
      forecast: '2.1%',
      previous: '1.8%',
      category: 'GDP',
      description: 'Britisches Bruttoinlandsprodukt',
      date: addDays(new Date(), 2)
    }
  ]);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high':
        return <AlertCircle className="h-4 w-4" />;
      case 'medium':
        return <TrendingUp className="h-4 w-4" />;
      case 'low':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesImportance = importanceFilter === 'all' || event.importance === importanceFilter;
    const matchesCurrency = currencyFilter === 'all' || event.currency === currencyFilter;
    const matchesDate = viewMode === 'calendar' ? isSameDay(event.date, selectedDate) : true;
    return matchesImportance && matchesCurrency && matchesDate;
  });

  const eventsForSelectedDate = events.filter(event => isSameDay(event.date, selectedDate));

  return (
    <div className="min-h-screen bg-stravesta-dark relative">
      <div className="absolute inset-0 bg-gradient-to-br from-stravesta-teal/5 via-transparent to-stravesta-navy/20"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-stravesta-navy/80 backdrop-blur-sm border-b border-stravesta-teal/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="ghost"
                  size="sm"
                  className="text-stravesta-lightGray hover:text-white hover:bg-stravesta-navy"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück
                </Button>
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-6 w-6 text-stravesta-teal" />
                  <h1 className="text-2xl font-bold text-gradient">Economic Calendar</h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={viewMode} onValueChange={(value: 'calendar' | 'list') => setViewMode(value)}>
                  <SelectTrigger className="w-32 bg-stravesta-navy border-stravesta-darkGray text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-stravesta-navy border-stravesta-darkGray">
                    <SelectItem value="list">Liste</SelectItem>
                    <SelectItem value="calendar">Kalender</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters & Calendar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Filters */}
              <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Filter className="h-5 w-5 text-stravesta-teal" />
                    Filter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-stravesta-lightGray mb-2 block">
                      Wichtigkeit
                    </label>
                    <Select value={importanceFilter} onValueChange={setImportanceFilter}>
                      <SelectTrigger className="bg-stravesta-darkGray border-stravesta-teal/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-stravesta-navy border-stravesta-darkGray">
                        <SelectItem value="all">Alle</SelectItem>
                        <SelectItem value="high">Hoch</SelectItem>
                        <SelectItem value="medium">Mittel</SelectItem>
                        <SelectItem value="low">Niedrig</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-stravesta-lightGray mb-2 block">
                      Währung
                    </label>
                    <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                      <SelectTrigger className="bg-stravesta-darkGray border-stravesta-teal/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-stravesta-navy border-stravesta-darkGray">
                        <SelectItem value="all">Alle</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Mini Calendar */}
              {viewMode === 'calendar' && (
                <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Datum auswählen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-md border-0 text-white"
                      classNames={{
                        months: "flex flex-col space-y-4",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center text-white",
                        caption_label: "text-sm font-medium text-white",
                        nav_button: cn(
                          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white hover:bg-stravesta-teal/20"
                        ),
                        head_cell: "text-stravesta-lightGray rounded-md w-9 font-normal text-[0.8rem]",
                        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 text-white",
                        day: cn(
                          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-stravesta-teal/20 text-white"
                        ),
                        day_selected: "bg-stravesta-teal text-stravesta-dark hover:bg-stravesta-teal hover:text-stravesta-dark",
                        day_today: "bg-stravesta-navy text-stravesta-teal font-bold",
                        day_outside: "text-stravesta-lightGray/50 opacity-50",
                      }}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Events List/Table */}
            <div className="lg:col-span-3">
              <Card className="bg-stravesta-navy/50 border-stravesta-teal/20 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-xl">
                        {viewMode === 'calendar' 
                          ? `Ereignisse für ${format(selectedDate, 'dd. MMMM yyyy', { locale: de })}`
                          : 'Alle kommenden Ereignisse'
                        }
                      </CardTitle>
                      <CardDescription className="text-stravesta-lightGray">
                        {filteredEvents.length} Ereignisse gefunden
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-stravesta-teal/20 hover:bg-transparent">
                          <TableHead className="text-stravesta-lightGray">Zeit</TableHead>
                          <TableHead className="text-stravesta-lightGray">Währung</TableHead>
                          <TableHead className="text-stravesta-lightGray">Ereignis</TableHead>
                          <TableHead className="text-stravesta-lightGray">Wichtigkeit</TableHead>
                          <TableHead className="text-stravesta-lightGray">Prognose</TableHead>
                          <TableHead className="text-stravesta-lightGray">Vorherig</TableHead>
                          <TableHead className="text-stravesta-lightGray">Aktuell</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEvents.map((event) => (
                          <TableRow 
                            key={event.id} 
                            className="border-stravesta-teal/10 hover:bg-stravesta-teal/5 transition-colors cursor-pointer group"
                          >
                            <TableCell className="font-medium text-white">{event.time}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-stravesta-teal/30 text-stravesta-teal">
                                {event.currency}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-white group-hover:text-stravesta-teal transition-colors">
                              {event.event}
                            </TableCell>
                            <TableCell>
                              <Badge className={cn('flex items-center gap-1 w-fit', getImportanceColor(event.importance))}>
                                {getImportanceIcon(event.importance)}
                                {event.importance === 'high' ? 'Hoch' : event.importance === 'medium' ? 'Mittel' : 'Niedrig'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-stravesta-lightGray">{event.forecast || '-'}</TableCell>
                            <TableCell className="text-stravesta-lightGray">{event.previous || '-'}</TableCell>
                            <TableCell className="text-white font-medium">{event.actual || '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                      <CalendarIcon className="h-12 w-12 text-stravesta-lightGray/50 mx-auto mb-4" />
                      <p className="text-stravesta-lightGray">Keine Ereignisse für die ausgewählten Filter gefunden.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EconomicCalendar;
