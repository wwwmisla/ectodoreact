import { Alert } from '@mui/material';

export default function MotivationalAlert() {
    const messages = [
        'Você está indo muito bem! 🚀',
        'Lembre-se: cada tarefa concluída é uma vitória! 🏆',
        'Mantenha o foco e continue avançando! 💡',
        'Progresso, não perfeição! Cada passo conta. 👣',
        'Seu esforço hoje é seu sucesso amanhã! 🌟',
        'Uau! Você está no caminho certo! 🔥',
        'A persistência transforma o difícil em possível! 💪',
        'Celebre cada pequena conquista! 🎉',
        'Sua produtividade está inspiradora! ✨',
        'A jornada de mil milhas começa com um passo - e você já começou! 🛣️',
        'Foco no progresso, não na perfeição! 🎯',
        'Você é mais forte do que pensa! 💫',
        'Isso aí! A consistência leva à excelência! 📈',
        'Respire fundo e siga em frente - você consegue! 🌬️',
        'Sua dedicação vai te levar longe! 🏃‍♂️💨',
        'Cada minuto de esforço vale a pena! ⏳',
        'Você está construindo algo incrível! 🏗️',
        'Acredite no seu potencial ilimitado! 🌌',
        'Sua energia positiva contagia! 😊',
        'Nada pode parar você hoje! 🚧✋',
        'Transforme objetivos em conquistas! 🎯➡️🏆',
        'Sua mente brilhante está criando coisas incríveis! 💎',
        'O sucesso é a soma de pequenos esforços repetidos! ➕',
        'Você está dominando a arte da produtividade! 🎨',
        'Isso é só o começo do seu sucesso! 🌱',
        'Seu progresso hoje vai inspirar outros amanhã! 🌟',
        'Mantenha essa chama acesa! 🔥',
        'Você está escrevendo sua história de sucesso! 📖',
        'Cada tarefa é uma semente para seu futuro! 🌻',
        'Sua determinação é admirável! 👏',
        'O conhecimento que você está adquirindo é seu para sempre! 🧠',
        'Você está se superando a cada dia! 📅',
        'Aproveite o processo tanto quanto o resultado! 🛤️',
        'Sua disciplina vai te levar onde você quer chegar! ✈️',
        'Você é capaz de coisas incríveis! 🌠',
        'Não pare agora - você está no seu ritmo! 🥁',
        'Seu futuro eu agradece pelo seu esforço hoje! 🙏',
        'Transforme desafios em degraus para o sucesso! 🪜',
        'Sua jornada está inspirando outros! 👀',
        'A cada tarefa, você fica mais forte! 🏋️‍♂️'
    ];
    const random = Math.floor(Math.random() * messages.length);

    return (
        <Alert severity="info" sx={{ my: 2 }}>
            {messages[random]}
        </Alert>
    );
}
