// Configura data e hora automaticamente
document.addEventListener('DOMContentLoaded', () => {
    const datetimeInput = document.getElementById('datetime');
    const now = new Date();
    const brasiliaOffset = -3; // Brasília is UTC-3
    now.setHours(now.getUTCHours() + brasiliaOffset);
    const formattedDate = now.toISOString().slice(0, 16);
    datetimeInput.value = formattedDate;

    // Configura cálculos automáticos das taxas
    setupAutomaticCalculations();
});

function setupAutomaticCalculations() {
    // Enfermaria Pediátrica
    document.getElementById('enf-pacientes').addEventListener('input', calculateTaxa);
    document.getElementById('enf-leitos').addEventListener('input', calculateTaxa);
    
    // PS Pediátrico
    document.getElementById('internacao-pacientes').addEventListener('input', calculateTaxa);
    document.getElementById('internacao-leitos').addEventListener('input', calculateTaxa);
    
    // Box Pediátrico
    document.getElementById('box-pacientes').addEventListener('input', calculateTaxa);
    document.getElementById('box-leitos').addEventListener('input', calculateTaxa);

    function calculateTaxa() {
        const prefix = this.id.includes('enf') ? 'enf' : 
                      this.id.includes('internacao') ? 'internacao' : 'box';
        
        const pacientes = parseFloat(document.getElementById(`${prefix}-pacientes`).value) || 0;
        const leitos = parseFloat(document.getElementById(`${prefix}-leitos`).value) || 0;
        const taxaInput = document.getElementById(`${prefix}-taxa`);

        if (leitos > 0) {
            const taxa = ((pacientes / leitos) * 100).toFixed(2);
            taxaInput.value = taxa;
        } else {
            taxaInput.value = '';
        }
    }
}

document.getElementById('sazonalidadeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Formata data e hora
    const now = new Date();
    const brasiliaOffset = -3;
    now.setHours(now.getUTCHours() + brasiliaOffset);
    const formattedDate = now.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(',', '');

    // Captura todos os valores usando IDs específicos
    const hospital = document.getElementById('hospital').value;
    const enfPacientes = document.getElementById('enf-pacientes').value || '00';
    const enfLeitos = document.getElementById('enf-leitos').value || '00';
    const enfTaxa = document.getElementById('enf-taxa').value || '00';
    const internacaoPacientes = document.getElementById('internacao-pacientes').value || '00';
    const internacaoLeitos = document.getElementById('internacao-leitos').value || '00';
    const internacaoTaxa = document.getElementById('internacao-taxa').value || '00';
    const boxPacientes = document.getElementById('box-pacientes').value || '00';
    const boxLeitos = document.getElementById('box-leitos').value || '00';
    const boxTaxa = document.getElementById('box-taxa').value || '00';
    const vermelho = document.getElementById('vermelho').value || '00';
    const laranja = document.getElementById('laranja').value || '00';
    const amarelo = document.getElementById('amarelo').value || '00';
    const verde = document.getElementById('verde').value || '00';
    const esperaResp = document.getElementById('espera-respiratoria').value || '00';
    const esperaGeral = document.getElementById('espera-geral').value || '00';
    const esperaUTIPed = document.getElementById('espera-uti-ped').value || '00';
    const esperaUTINeo = document.getElementById('espera-uti-neo').value || '00';
    const leitosResgate = document.getElementById('leitos-resgate').value || '00';
    const leitosResp = document.getElementById('leitos-respiratorio').value || '00';
    const leitosGeral = document.getElementById('leitos-geral').value || '00';
    const utiPed = document.getElementById('uti-ped').value || '00';
    const utiNeo = document.getElementById('uti-neo').value || '00';
    const boletimPor = document.getElementById('boletim-por').value || 'NÃO INFORMADO';

    // Formata o relatório
    let mensagem = `SAZONALIDADE PEDIATRIA - BOLETIM SITUACIONAL INFORMATIVO\n\n`;
    mensagem += `🏥 ${hospital}\n\n`;
    mensagem += `🗓️ ${formattedDate}\n\n`;
    
    mensagem += `📈TAXA DE OCUPAÇÃO\n`;
    mensagem += `🛌🏻 Internação - Enfermaria Pediátrica - 1° andar:\n`;
    mensagem += `\tInternados: ${enfPacientes}\n`;
    mensagem += `\tLeitos Operacionais: ${enfLeitos}\n`;
    mensagem += `\tTaxa de Ocupação: ${enfTaxa}%\n\n`;
    
    mensagem += `🛏️ Internação - PS Pediátrico - Térreo\n`;
    mensagem += `\tInternados: ${internacaoPacientes}\n`;
    mensagem += `\tLeitos Operacionais: ${internacaoLeitos}\n`;
    mensagem += `\tTaxa de Ocupação: ${internacaoTaxa}%\n\n`;
    
    mensagem += `🚨Box Pediátrico\n`;
    mensagem += `\tInternados: ${boxPacientes}\n`;
    mensagem += `\tLeitos Operacionais: ${boxLeitos}\n`;
    mensagem += `\tTaxa de Ocupação: ${boxTaxa}%\n\n`;
    
    mensagem += `🏪ESPERA ATENDIMENTO - PRONTO SOCORRO INFANTIL\n`;
    mensagem += `🔴 ${vermelho}   🟠 ${laranja}  🟡 ${amarelo} 🟢 ${verde}\n\n`;
    
    mensagem += `🚑 STATUS - FILA DE ESPERA:\n`;
    mensagem += `- Aguardando vaga de Enfermaria respiratória: ${esperaResp} pacientes\n`;
    mensagem += `- Aguardando vaga de Enfermaria geral: ${esperaGeral} pacientes\n`;
    mensagem += `- Aguardando vaga de UTI Pediátrica: ${esperaUTIPed} pacientes\n`;
    mensagem += `- Aguardando vaga de UTI neonatal: ${esperaUTINeo} pacientes\n\n`;
    
    mensagem += `ℹ️ STATUS - LEITOS\n`;
    mensagem += `* Leitos cedidos para resgate de UTI Pediátrica: ${leitosResgate} leitos\n`;
    mensagem += `* Leitos cedidos para pronto socorro infantil - Respiratório: ${leitosResp} leitos\n`;
    mensagem += `* Leitos cedidos para pronto socorro infantil - Geral: ${leitosGeral} leitos\n\n`;
    
    mensagem += `🖥️ STATUS - ESPERA - LEITOS DE UTI:\n`;
    mensagem += `* UTI Pediátrica: ${utiPed}\n`;
    mensagem += `* UTI Neonatal: ${utiNeo}\n`;
    mensagem += `Fonte: https://info.saude.df.gov.br/sala-de-situacao/painel-infosaude-lista-de-espera-de-leitos-de-uti/\n\n`;
    
    mensagem += `📞 CONTATOS IMPORTANTES:\n`;
    mensagem += `📞 Central de Regulação: [3449 - 4333 / 3449-4335 / 3449-4336 / 3449-4337]\n`;
    mensagem += `📩 [crdf@saude.df.gov.br / regulacaodeuti@saude.df.gov.br]\n\n`;
    
    mensagem += `👨‍⚕️ Boletim por: ${boletimPor}`;

    // Exibe o relatório no modal
    const reportContent = document.getElementById('reportContent');
    reportContent.textContent = mensagem;

    // Abre o modal
    const reportModal = new bootstrap.Modal(document.getElementById('reportModal'));
    reportModal.show();
});

// Copia o conteúdo do relatório
document.getElementById('copyReport').addEventListener('click', function() {
    const reportContent = document.getElementById('reportContent').textContent;
    navigator.clipboard.writeText(reportContent).then(() => {
        alert('Relatório copiado para a área de transferência!');
    }).catch(err => {
        alert('Erro ao copiar o relatório: ' + err);
    });
});

// Função para gerar PDF
document.getElementById('generatePDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yPos = 20; // Posição vertical inicial
    const pageHeight = 297; // Altura da página A4 em mm
    const margin = 20; // Margem da página
    const lineHeight = 10; // Altura da linha
    
    // Função para adicionar texto e verificar se precisa de nova página
    function addText(text, x, y) {
        if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
        doc.text(text, x, y);
        return y + lineHeight;
    }
    
    // Configurações iniciais
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    yPos = addText("SAZONALIDADE PEDIATRIA", margin + 50, yPos);
    yPos = addText("BOLETIM SITUACIONAL INFORMATIVO", margin + 35, yPos);
    
    // Data e hora
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const datetime = document.getElementById('datetime').value;
    const formattedDate = new Date(datetime).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(',', '');
    yPos = addText(`Data e Hora: ${formattedDate}`, margin, yPos);
    yPos = addText(`Hospital: ${document.getElementById('hospital').value}`, margin, yPos);
    
    // Taxa de Ocupação
    doc.setFont("helvetica", "bold");
    yPos = addText("TAXA DE OCUPAÇÃO", margin, yPos);
    doc.setFont("helvetica", "normal");
    
    // Enfermaria
    yPos = addText("Internação - Enfermaria Pediátrica - 1° andar:", margin, yPos);
    yPos = addText(`Internados: ${document.getElementById('enf-pacientes').value}`, margin + 10, yPos);
    yPos = addText(`Leitos Operacionais: ${document.getElementById('enf-leitos').value}`, margin + 10, yPos);
    yPos = addText(`Taxa de Ocupação: ${document.getElementById('enf-taxa').value}%`, margin + 10, yPos);
    
    // PS Pediátrico
    yPos = addText("Internação - PS Pediátrico - Térreo:", margin, yPos);
    yPos = addText(`Internados: ${document.getElementById('internacao-pacientes').value}`, margin + 10, yPos);
    yPos = addText(`Leitos Operacionais: ${document.getElementById('internacao-leitos').value}`, margin + 10, yPos);
    yPos = addText(`Taxa de Ocupação: ${document.getElementById('internacao-taxa').value}%`, margin + 10, yPos);
    
    // Box Pediátrico
    yPos = addText("Box Pediátrico:", margin, yPos);
    yPos = addText(`Internados: ${document.getElementById('box-pacientes').value}`, margin + 10, yPos);
    yPos = addText(`Leitos Operacionais: ${document.getElementById('box-leitos').value}`, margin + 10, yPos);
    yPos = addText(`Taxa de Ocupação: ${document.getElementById('box-taxa').value}%`, margin + 10, yPos);
    
    // Espera Atendimento
    doc.setFont("helvetica", "bold");
    yPos = addText("ESPERA ATENDIMENTO - PRONTO SOCORRO INFANTIL", margin, yPos);
    doc.setFont("helvetica", "normal");
    yPos = addText(`Vermelho: ${document.getElementById('vermelho').value}`, margin + 10, yPos);
    yPos = addText(`Laranja: ${document.getElementById('laranja').value}`, margin + 10, yPos);
    yPos = addText(`Amarelo: ${document.getElementById('amarelo').value}`, margin + 10, yPos);
    yPos = addText(`Verde: ${document.getElementById('verde').value}`, margin + 10, yPos);
    
    // Fila de Espera
    doc.setFont("helvetica", "bold");
    yPos = addText("STATUS - FILA DE ESPERA:", margin, yPos);
    doc.setFont("helvetica", "normal");
    yPos = addText(`- Aguardando vaga de Enfermaria respiratória: ${document.getElementById('espera-respiratoria').value} pacientes`, margin + 10, yPos);
    yPos = addText(`- Aguardando vaga de Enfermaria geral: ${document.getElementById('espera-geral').value} pacientes`, margin + 10, yPos);
    yPos = addText(`- Aguardando vaga de UTI Pediátrica: ${document.getElementById('espera-uti-ped').value} pacientes`, margin + 10, yPos);
    yPos = addText(`- Aguardando vaga de UTI neonatal: ${document.getElementById('espera-uti-neo').value} pacientes`, margin + 10, yPos);
    
    // Status Leitos
    doc.setFont("helvetica", "bold");
    yPos = addText("STATUS - LEITOS:", margin, yPos);
    doc.setFont("helvetica", "normal");
    yPos = addText(`* Leitos cedidos para resgate de UTI Pediátrica: ${document.getElementById('leitos-resgate').value} leitos`, margin + 10, yPos);
    yPos = addText(`* Leitos cedidos para pronto socorro infantil - Respiratório: ${document.getElementById('leitos-respiratorio').value} leitos`, margin + 10, yPos);
    yPos = addText(`* Leitos cedidos para pronto socorro infantil - Geral: ${document.getElementById('leitos-geral').value} leitos`, margin + 10, yPos);
    
    // Status UTI
    doc.setFont("helvetica", "bold");
    yPos = addText("STATUS - ESPERA - LEITOS DE UTI:", margin, yPos);
    doc.setFont("helvetica", "normal");
    yPos = addText(`* UTI Pediátrica: ${document.getElementById('uti-ped').value}`, margin + 10, yPos);
    yPos = addText(`* UTI Neonatal: ${document.getElementById('uti-neo').value}`, margin + 10, yPos);
    
    // Contatos
    doc.setFont("helvetica", "bold");
    yPos = addText("CONTATOS IMPORTANTES:", margin, yPos);
    doc.setFont("helvetica", "normal");
    yPos = addText("Central de Regulação: [3449 - 4333 / 3449-4335 / 3449-4336 / 3449-4337]", margin + 10, yPos);
    yPos = addText("[crdf@saude.df.gov.br / regulacaodeuti@saude.df.gov.br]", margin + 10, yPos);
    
    // Boletim por
    doc.setFont("helvetica", "bold");
    yPos = addText(`Boletim por: ${document.getElementById('boletim-por').value}`, margin, yPos);
    
    // Salva o PDF
    doc.save(`sazonalidade_pediatria_${formattedDate.replace(/[\/\s:]/g, '_')}.pdf`);
});