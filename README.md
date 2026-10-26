# Diário de Condução TVDE

Aplicação web instalável para registar as horas de condução na **Uber** e na **Bolt**, as pausas de descanso e gerar relatórios por dia, semana e mês.

## Funcionalidades

- Botões grandes para começar a rodar na Uber ou na Bolt, fazer pausa e terminar o turno.
- Troca de aplicação com um toque: o tempo da anterior fecha automaticamente.
- Barra de condução nas últimas 24 horas, somando as duas plataformas (limite de 10 h da Lei 45/2018).
- Relatório com totais, gráfico por dia e detalhe de cada período.
- Adicionar períodos esquecidos e apagar registos errados.
- Exportação em CSV e cópia de segurança em JSON.
- Funciona sem internet e instala-se no ecrã do telemóvel ou tablet.

Os registos ficam guardados apenas no aparelho (localStorage).

## Tecnologias

HTML, CSS e JavaScript puro, sem frameworks. Manifesto web e service worker para instalação e uso offline.
