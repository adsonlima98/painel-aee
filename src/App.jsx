import React, { useState, useMemo } from 'react';
import { Search, Users, Calendar, Clock, BookOpen, X, User, GraduationCap, AlertCircle } from 'lucide-react';

const rawData = [
  // Cristiane Martins
  { student: "Samuel", day: "Segunda", time: "07h50 às 08h40", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Luiz Guilherme", day: "Segunda", time: "09h00 às 09h50", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Luiz Guilherme", day: "Segunda", time: "09h50 às 10h40", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Samuel", day: "Segunda", time: "10h40 às 11h30", type: "Ens. Colaborativo", teacher: "Cristiane Martins" },
  { student: "Luiz Guilherme", day: "Terça", time: "07h50 às 08h40", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Samuel", day: "Terça", time: "09h00 às 09h50", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Samuel", day: "Terça", time: "09h50 às 10h40", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Samuel", day: "Terça", time: "10h40 às 11h30", type: "Ens. Colaborativo", teacher: "Cristiane Martins" },
  { student: "Luiz Guilherme", day: "Quarta", time: "07h50 às 08h40", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Luiz Guilherme", day: "Quarta", time: "09h00 às 09h50", type: "Ens. Colaborativo", teacher: "Cristiane Martins" },
  { student: "Luiz Guilherme", day: "Quarta", time: "09h50 às 10h40", type: "Ens. Colaborativo", teacher: "Cristiane Martins" },
  { student: "Samuel", day: "Quarta", time: "10h40 às 11h30", type: "Ens. Colaborativo", teacher: "Cristiane Martins" },
  { student: "Samuel", day: "Quinta", time: "07h50 às 08h40", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Luiz Guilherme", day: "Quinta", time: "09h00 às 09h50", type: "Ens. Colaborativo", teacher: "Cristiane Martins" },
  { student: "Luiz Guilherme", day: "Quinta", time: "09h50 às 10h40", type: "Ens. Colaborativo", teacher: "Cristiane Martins" },
  { student: "Samuel", day: "Quinta", time: "10h40 às 11h30", type: "Ens. Colaborativo", teacher: "Cristiane Martins" },
  { student: "Samuel", day: "Sexta", time: "07h00 às 07h50", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Samuel", day: "Sexta", time: "07h50 às 08h40", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Luiz Guilherme", day: "Sexta", time: "09h00 às 09h50", type: "AEE", teacher: "Cristiane Martins" },
  { student: "Luiz Guilherme", day: "Sexta", time: "09h50 às 10h40", type: "AEE", teacher: "Cristiane Martins" },

  // Simone Correia
  { student: "Lucas Prado", day: "Segunda", time: "07h00 às 07h50", type: "AEE", teacher: "Simone Correia" },
  { student: "Lucas Prado", day: "Segunda", time: "07h50 às 08h40", type: "AEE", teacher: "Simone Correia" },
  { student: "Laura", day: "Segunda", time: "09h00 às 09h50", type: "AEE", teacher: "Simone Correia" },
  { student: "Laura", day: "Segunda", time: "09h50 às 10h40", type: "AEE", teacher: "Simone Correia" },
  { student: "Lucas Darcio", day: "Segunda", time: "10h40 às 11h30", type: "AEE", teacher: "Simone Correia" },
  { student: "Kelvin", day: "Segunda", time: "11h30 às 12h20", type: "AEE", teacher: "Simone Correia" },
  { student: "Kelvin", day: "Segunda", time: "12h20 às 13h10", type: "AEE", teacher: "Simone Correia" },
  { student: "Lucas Darcio", day: "Segunda", time: "13h10 às 14h00", type: "AEE", teacher: "Simone Correia" },
  { student: "Laura", day: "Terça", time: "07h00 às 07h50", type: "AEE", teacher: "Simone Correia" },
  { student: "Davi", day: "Terça", time: "07h50 às 08h40", type: "AEE", teacher: "Simone Correia" },
  { student: "Giovanna", day: "Terça", time: "09h00 às 09h50", type: "AEE", teacher: "Simone Correia" },
  { student: "Giovanna", day: "Terça", time: "09h50 às 10h40", type: "AEE", teacher: "Simone Correia" },
  { student: "Lucas Darcio", day: "Terça", time: "10h40 às 11h30", type: "AEE", teacher: "Simone Correia" },
  { student: "Davi", day: "Terça", time: "11h30 às 12h20", type: "Ens. Colaborativo", teacher: "Simone Correia" },
  { student: "Kanna", day: "Terça", time: "12h20 às 13h10", type: "AEE", teacher: "Simone Correia" },
  { student: "Laura", day: "Terça", time: "13h10 às 14h00", type: "AEE", teacher: "Simone Correia" },
  { student: "Jose Ricardo", day: "Quarta", time: "07h00 às 07h50", type: "AEE", teacher: "Simone Correia" },
  { student: "Jose Ricardo", day: "Quarta", time: "07h50 às 08h40", type: "AEE", teacher: "Simone Correia" },
  { student: "Laura", day: "Quarta", time: "09h00 às 09h50", type: "AEE", teacher: "Simone Correia" },
  { student: "Laura", day: "Quarta", time: "09h50 às 10h40", type: "AEE", teacher: "Simone Correia" },
  { student: "Kanna", day: "Quarta", time: "10h40 às 11h30", type: "AEE", teacher: "Simone Correia" },
  { student: "Davi", day: "Quarta", time: "11h30 às 12h20", type: "Ens. Colaborativo", teacher: "Simone Correia" },
  { student: "Kanna", day: "Quarta", time: "12h20 às 13h10", type: "AEE", teacher: "Simone Correia" },
  { student: "Kelvin", day: "Quarta", time: "13h10 às 14h00", type: "AEE", teacher: "Simone Correia" },
  { student: "Jose Ricardo", day: "Quinta", time: "07h00 às 07h50", type: "AEE", teacher: "Simone Correia" },
  { student: "Laura", day: "Quinta", time: "07h50 às 08h40", type: "Ens. Colaborativo", teacher: "Simone Correia" },
  { student: "Giovanna", day: "Quinta", time: "09h00 às 09h50", type: "Ens. Colaborativo", teacher: "Simone Correia" },
  { student: "Giovanna", day: "Quinta", time: "09h50 às 10h40", type: "Ens. Colaborativo", teacher: "Simone Correia" },
  { student: "Laura", day: "Quinta", time: "10h40 às 11h30", type: "Ens. Colaborativo", teacher: "Simone Correia" },
  { student: "Davi", day: "Quinta", time: "11h30 às 12h20", type: "AEE", teacher: "Simone Correia" },
  { student: "Laura", day: "Quinta", time: "12h20 às 13h10", type: "Ens. Colaborativo", teacher: "Simone Correia" },
  { student: "Laura", day: "Quinta", time: "13h10 às 14h00", type: "Ens. Colaborativo", teacher: "Simone Correia" },

  // Barbara Massafera
  { student: "Brenda Lee", day: "Segunda", time: "09h50 às 10h40", type: "Ens. Colaborativo", teacher: "Barbara Massafera" },
  { student: "Arthur Pereira", day: "Segunda", time: "10h40 às 11h30", type: "Ens. Colaborativo", teacher: "Barbara Massafera" },
  { student: "Brenda Batista", day: "Segunda", time: "14h30 às 15h20", type: "Ens. Colaborativo", teacher: "Barbara Massafera" },
  { student: "Brenda Batista", day: "Segunda", time: "15h20 às 16h10", type: "Ens. Colaborativo", teacher: "Barbara Massafera" },
  { student: "Thiago Fernandes", day: "Segunda", time: "16h30 às 17h20", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Thiago Fernandes", day: "Segunda", time: "17h20 às 18h10", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Brenda Batista", day: "Segunda", time: "18h10 às 19h00", type: "Ens. Colaborativo", teacher: "Barbara Massafera" },
  { student: "Gustavo", day: "Segunda", time: "19h50 às 20h40", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Gustavo", day: "Segunda", time: "20h40 às 21h30", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Brenda Lee", day: "Terça", time: "09h50 às 10h40", type: "Ens. Colaborativo", teacher: "Barbara Massafera" },
  { student: "Arthur Pereira", day: "Terça", time: "10h40 às 11h30", type: "Ens. Colaborativo", teacher: "Barbara Massafera" },
  { student: "Brenda Batista", day: "Terça", time: "14h30 às 15h20", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Brenda Batista", day: "Terça", time: "15h20 às 16h10", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Maria Eduarda", day: "Terça", time: "16h30 às 17h20", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Maria Eduarda", day: "Terça", time: "17h20 às 18h10", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Thiago Fernandes", day: "Terça", time: "18h10 às 19h00", type: "Ens. Colaborativo", teacher: "Barbara Massafera" },
  { student: "Marco Antonio", day: "Terça", time: "19h50 às 20h40", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Marco Antonio", day: "Terça", time: "20h40 às 21h30", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Brenda Lee", day: "Quarta", time: "09h00 às 09h50", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Brenda Lee", day: "Quarta", time: "09h50 às 10h40", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Arthur Pereira", day: "Quarta", time: "10h40 às 11h30", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Felipe Lima", day: "Quarta", time: "14h30 às 15h20", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Maria Eduarda", day: "Quarta", time: "16h30 às 17h20", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Maria Eduarda", day: "Quarta", time: "17h20 às 18h10", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Brenda Batista", day: "Quarta", time: "18h10 às 19h00", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Brenda Lee", day: "Quinta", time: "09h00 às 09h50", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Brenda Lee", day: "Quinta", time: "09h50 às 10h40", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Arthur Pereira", day: "Quinta", time: "10h40 às 11h30", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Felipe Lima", day: "Quinta", time: "14h30 às 15h20", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Maria Eduarda", day: "Quinta", time: "16h30 às 17h20", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Maria Eduarda", day: "Quinta", time: "17h20 às 18h10", type: "AEE", teacher: "Barbara Massafera" },
  { student: "Brenda Batista", day: "Quinta", time: "18h10 às 19h00", type: "AEE", teacher: "Barbara Massafera" },

  // Alexandro Braz
  { student: "Nicollas Vicente", day: "Quarta", time: "07h00 às 07h50", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Nicollas Vicente", day: "Quarta", time: "07h50 às 08h40", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Rafael Henrique", day: "Quarta", time: "09h00 às 09h50", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Rafael Henrique", day: "Quarta", time: "09h50 às 10h40", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Icaro Souza", day: "Quarta", time: "10h40 às 11h30", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Enzo Ap.", day: "Quarta", time: "12h20 às 13h10", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Enzo Ap.", day: "Quinta", time: "07h00 às 07h50", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Enzo Ap.", day: "Quinta", time: "07h50 às 08h40", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Icaro Souza", day: "Quinta", time: "09h00 às 09h50", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Icaro Souza", day: "Quinta", time: "09h50 às 10h40", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Rafael Henrique", day: "Quinta", time: "10h40 às 11h30", type: "AEE", teacher: "Alexandro Braz" },
  { student: "Nicollas Vicente", day: "Quinta", time: "12h20 às 13h10", type: "AEE", teacher: "Alexandro Braz" },

  // Suzana Godoy
  { student: "Enzo Henrique", day: "Terça", time: "07h00 às 07h50", type: "AEE", teacher: "Suzana Godoy" },
  { student: "Enzo Henrique", day: "Terça", time: "07h50 às 08h40", type: "AEE", teacher: "Suzana Godoy" },
  { student: "Vitória", day: "Terça", time: "09h00 às 09h50", type: "AEE", teacher: "Suzana Godoy" },
  { student: "Vitória", day: "Terça", time: "09h50 às 10h40", type: "AEE", teacher: "Suzana Godoy" },
  { student: "Gabriela", day: "Terça", time: "10h40 às 11h30", type: "AEE", teacher: "Suzana Godoy" },
  { student: "Enzo Henrique", day: "Terça", time: "12h20 às 13h10", type: "AEE", teacher: "Suzana Godoy" },
  
  { student: "Enzo Henrique", day: "Quarta", time: "07h00 às 07h50", type: "AEE", teacher: "Suzana Godoy" },
  { student: "Enzo Henrique", day: "Quarta", time: "07h50 às 08h40", type: "AEE", teacher: "Suzana Godoy" },
  { student: "Vitória", day: "Quarta", time: "09h00 às 09h50", type: "Ens. Colaborativo", teacher: "Suzana Godoy" },
  { student: "Gabriela", day: "Quarta", time: "09h50 às 10h40", type: "Ens. Colaborativo", teacher: "Suzana Godoy" },
  { student: "Enzo Henrique", day: "Quarta", time: "10h40 às 11h30", type: "AEE", teacher: "Suzana Godoy" },
  { student: "Enzo Henrique", day: "Quarta", time: "12h20 às 13h10", type: "Ens. Colaborativo", teacher: "Suzana Godoy" },
  { student: "Enzo Henrique", day: "Quarta", time: "13h10 às 14h00", type: "Ens. Colaborativo", teacher: "Suzana Godoy" },
  
  { student: "Gabriela", day: "Quinta", time: "07h00 às 07h50", type: "Ens. Colaborativo", teacher: "Suzana Godoy" },
  { student: "Vitória", day: "Quinta", time: "07h50 às 08h40", type: "Ens. Colaborativo", teacher: "Suzana Godoy" },
  { student: "Enzo Henrique", day: "Quinta", time: "09h00 às 09h50", type: "Ens. Colaborativo", teacher: "Suzana Godoy" },
  { student: "Enzo Henrique", day: "Quinta", time: "09h50 às 10h40", type: "Ens. Colaborativo", teacher: "Suzana Godoy" },
  { student: "Gabriela", day: "Quinta", time: "10h40 às 11h30", type: "AEE", teacher: "Suzana Godoy" },
  { student: "Vitória", day: "Quinta", time: "12h20 às 13h10", type: "AEE", teacher: "Suzana Godoy" },
  { student: "Gabriela", day: "Quinta", time: "13h10 às 14h00", type: "AEE", teacher: "Suzana Godoy" }
];

// Mapeamento dos nomes curtos do horário para Nomes Completos e Turmas
const studentsInfo = {
  "Laura": { fullName: "LAURA SATIRO MONTEIRO", grade: "8° ANO B" },
  "Nicollas Vicente": { fullName: "NICOLLAS VICENTE DE OLIVEIRA", grade: "9º ANO B" },
  "Rafael Henrique": { fullName: "RAFAEL HENRIQUE CONSTANTINO MARQUES", grade: "9º ANO E" },
  "Felipe Lima": { fullName: "FELIPE LIMA ROCHA", grade: "2ª SÉRIE C" },
  "Gustavo": { fullName: "GUSTAVO DE OLIVEIRA LACERDA", grade: "2ª SÉRIE A" },
  "Marco Antonio": { fullName: "MARCO ANTONIO FERRAZ DE MELO", grade: "3ª SÉRIE B" },
  "Lucas Prado": { fullName: "LUCAS EDUARDO PRADO SOUZA", grade: "7° ANO A" },
  "Lucas Darcio": { fullName: "LUCAS DARCIO", grade: "Não informada" },
  "Davi": { fullName: "DAVI GONCALVES LIMA", grade: "7° ANO A" },
  "Giovanna": { fullName: "GIOVANNA DE OLIVEIRA RICARDO", grade: "7° ANO A" },
  "Samuel": { fullName: "SAMUEL LOPES SANCHES REIS", grade: "8° ANO B" },
  "Enzo Ap.": { fullName: "ENZO APARECIDO OLIVEIRA DOS SANTOS", grade: "9º ANO E" },
  "Icaro Souza": { fullName: "ICARO SOUZA FAUSTINO TAVARES", grade: "8° ANO B" },
  "Kelvin": { fullName: "KELVIN CAUE RIBEIRO GOMES", grade: "7° ANO C" },
  "Brenda Batista": { fullName: "BRENDA BATISTA PEREIRA", grade: "2ª SERIE C" },
  "Thiago Fernandes": { fullName: "THIAGO FERNANDES DOS SANTOS", grade: "1ª SERIE B" },
  "Kanna": { fullName: "KANNÃ ALESSANDRO MASELKO PINTO", grade: "9º ANO E" },
  "Jose Ricardo": { fullName: "JOSÉ RICARDO ARAUJO DOS SANTOS", grade: "9º ANO D" },
  "Maria Eduarda": { fullName: "MARIA EDUARDA BAVELONI CEZAR", grade: "2ª SERIE C" },
  "Luiz Guilherme": { fullName: "LUIZ GUILHERME MOREIRA SILVA DOS ANJOS", grade: "7° ANO A" },
  "Arthur Pereira": { fullName: "ARTHUR PEREIRA MONTEIRO", grade: "9º ANO C" },
  "Brenda Lee": { fullName: "BRENDA LEE ARAUJO DOS SANTOS", grade: "7° ANO C" },
  // Novos alunos atribuídos
  "Enzo Henrique": { fullName: "ENZO HENRIQUE DUARTE DE SANTANA", grade: "8° ANO B" },
  "Gabriela": { fullName: "GABRIELA DE OLIVEIRA LEITE", grade: "8° ANO A" },
  "Vitória": { fullName: "VITORIA FERREIRA DE OLIVEIRA", grade: "8° ANO A" }
};

// Alunos sem agendamento no momento
const unscheduledStudents = [
  { fullName: "JOAO VICTOR ANDRADE DOS SANTOS", grade: "1ª SERIE A" },
  { fullName: "ANTHONY FERREIRA DE ARRUDA", grade: "6° ANO A" },
  { fullName: "ENZO ASSIS SATU DA SILVA RODRIGUES", grade: "6° ANO D" },
  { fullName: "NICOLY DA GUIA HENARES SILVA", grade: "9º ANO E" },
  { fullName: "RAFAELA ARAUJO GUESSY", grade: "2ª SERIE B" }
];

const dayOrder = { "Segunda": 1, "Terça": 2, "Quarta": 3, "Quinta": 4, "Sexta": 5 };

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('Todos');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Agrupa os dados e formata com os nomes completos
  const groupedData = useMemo(() => {
    const studentsMap = {};

    // 1. Processa alunos com horário
    rawData.forEach(session => {
      const info = studentsInfo[session.student] || { fullName: session.student, grade: "Não informada" };
      const key = info.fullName;

      if (!studentsMap[key]) {
        studentsMap[key] = {
          name: info.fullName,
          grade: info.grade,
          teachers: new Set(),
          sessions: []
        };
      }
      studentsMap[key].teachers.add(session.teacher);
      studentsMap[key].sessions.push(session);
    });

    // 2. Adiciona os alunos novos/sem horário
    unscheduledStudents.forEach(u => {
      if (!studentsMap[u.fullName]) {
        studentsMap[u.fullName] = {
          name: u.fullName,
          grade: u.grade,
          teachers: new Set(),
          sessions: []
        };
      }
    });

    // 3. Converte para array e ordena
    return Object.values(studentsMap).map(student => ({
      ...student,
      teachers: Array.from(student.teachers),
      sessions: student.sessions.sort((a, b) => {
        if (dayOrder[a.day] !== dayOrder[b.day]) {
          return dayOrder[a.day] - dayOrder[b.day];
        }
        return a.time.localeCompare(b.time);
      })
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Lista única de professores para o filtro
  const teachersList = ["Todos", ...Array.from(new Set(rawData.map(s => s.teacher)))];

  // Filtra os alunos baseado na busca e no professor selecionado
  const filteredStudents = groupedData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.grade.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Se selecionou um professor específico, mostra apenas os alunos que têm aula com ele
    // Alunos sem professor (0 aulas) só aparecem quando "Todos" está selecionado
    const matchesTeacher = selectedTeacher === 'Todos' || student.teachers.includes(selectedTeacher);
    
    return matchesSearch && matchesTeacher;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Stats */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            Dashboard de Atendimentos AEE
          </h1>
          <p className="text-gray-500 mt-2">Acompanhamento de horários AEE e Ensino Colaborativo</p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total de Alunos</p>
                <p className="text-2xl font-bold text-gray-800">{groupedData.length}</p>
              </div>
            </div>
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total de Aulas/Sessões</p>
                <p className="text-2xl font-bold text-gray-800">{rawData.length}</p>
              </div>
            </div>
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-lg text-red-500">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Aguardando Horário</p>
                <p className="text-2xl font-bold text-gray-800">
                  {groupedData.filter(s => s.sessions.length === 0).length}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-[28rem]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar aluno por nome ou turma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {teachersList.map(teacher => (
              <button
                key={teacher}
                onClick={() => setSelectedTeacher(teacher)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTeacher === teacher 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {teacher}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Alunos */}
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStudents.map(student => {
              const hasClasses = student.sessions.length > 0;
              return (
                <div 
                  key={student.name}
                  onClick={() => setSelectedStudent(student)}
                  className={`bg-white rounded-xl shadow-sm border p-6 transition-all cursor-pointer group flex flex-col
                    ${hasClasses ? 'border-gray-100 hover:shadow-lg hover:border-indigo-200' : 'border-red-100 bg-red-50/20 hover:border-red-300'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-colors
                      ${hasClasses ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-red-100 text-red-600'}`}
                    >
                      {student.name.charAt(0)}
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap
                      ${hasClasses ? 'bg-emerald-50 text-emerald-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {student.sessions.length} {student.sessions.length === 1 ? 'aula' : 'aulas'}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-[15px] leading-tight font-bold text-gray-800 mb-2 line-clamp-2" title={student.name}>
                      {student.name}
                    </h3>
                    
                    <div className="space-y-2 mt-3">
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate font-medium">{student.grade}</span>
                      </p>
                      
                      {hasClasses ? (
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{student.teachers.join(', ')}</span>
                        </p>
                      ) : (
                        <p className="text-sm text-red-500 flex items-center gap-2 font-medium">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>Sem atendimento agendado</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <button className={`w-full mt-5 py-2 rounded-lg font-medium text-sm transition-colors
                    ${hasClasses ? 'bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                  >
                    Ver Detalhes
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium text-lg">Nenhum aluno encontrado.</p>
            <p className="text-gray-400 text-sm">Tente ajustar seus filtros de busca.</p>
          </div>
        )}
      </div>

      {/* Modal de Detalhes do Aluno */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            
            <div className={`flex items-start justify-between p-6 border-b border-gray-100 ${selectedStudent.sessions.length > 0 ? 'bg-indigo-50/50' : 'bg-red-50/50'}`}>
              <div className="flex items-center gap-4 pr-8">
                <div className={`w-14 h-14 rounded-full flex flex-shrink-0 items-center justify-center font-bold text-2xl shadow-md
                  ${selectedStudent.sessions.length > 0 ? 'bg-indigo-600 text-white' : 'bg-red-500 text-white'}`}>
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight mb-1">{selectedStudent.name}</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-medium text-sm flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                      <GraduationCap className="w-4 h-4" />
                      {selectedStudent.grade}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-colors flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              {selectedStudent.sessions.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-red-200 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Sem horários agendados</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    Este aluno ainda não possui nenhum horário de AEE ou Ensino Colaborativo registrado no sistema.
                  </p>
                </div>
              ) : (
                Object.entries(
                  selectedStudent.sessions.reduce((acc, session) => {
                    if (!acc[session.day]) acc[session.day] = [];
                    acc[session.day].push(session);
                    return acc;
                  }, {})
                ).map(([day, sessionsForDay]) => (
                  <div key={day} className="mb-6 last:mb-0">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {day}-feira
                    </h3>
                    
                    <div className="space-y-3">
                      {sessionsForDay.map((session, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:border-indigo-100 transition-colors">
                          <div className="flex items-center gap-3 mb-3 sm:mb-0">
                            <div className="bg-indigo-50 p-2.5 rounded-lg text-indigo-600">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-800">{session.time}</p>
                              <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5 mt-0.5">
                                {session.type === 'AEE' ? (
                                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                                ) : (
                                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                                )}
                                {session.type}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-600">{session.teacher}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}