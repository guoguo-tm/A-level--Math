// ========== AI Assistant ==========
class AIAssistant {
  constructor() {
    this.messages = [];
    this.isOpen = false;
    this.isLoading = false;
    this.conversationId = null;

    // System prompt
    this.systemPromptZh = `你是一个专业的A-Level数学学习助手，专门帮助学生学习Edexcel/AQA/OCR考试局的A-Level数学课程。你可以：
1. 解释数学概念和定理
2. 提供解题思路和步骤
3. 分析题目并给出解答
4. 出类似的练习题帮助学生巩固
5. 用通俗易懂的语言讲解复杂概念

请用中文回答，数学公式用LaTeX格式包裹在\\( \\)之间。回答要简洁明了，适合高中生理解。`;

    this.systemPromptEn = `You are a professional A-Level Mathematics tutor, helping students with the Edexcel/AQA/OCR A-Level Mathematics curriculum. You can:
1. Explain mathematical concepts and theorems
2. Provide problem-solving strategies and steps
3. Analyse problems and give solutions
4. Create similar practice problems to help students consolidate learning
5. Explain complex concepts in simple, accessible language

Please respond in English. Write mathematical formulas using LaTeX notation wrapped in \\( \\). Keep answers concise and suitable for high school students.`;
  }

  /**
   * Get system prompt based on language
   */
  getSystemPrompt() {
    return i18n.getLang() === 'zh' ? this.systemPromptZh : this.systemPromptEn;
  }

  /**
   * Build context from current question
   */
  getQuestionContext() {
    const q = questionGenerator.currentQuestion;
    if (!q) return '';

    const lang = i18n.getLang();
    const questionText = lang === 'zh' ? q.questionZh : q.questionEn;
    const solutionText = lang === 'zh' ? q.solutionZh : q.solutionEn;

    return lang === 'zh'
      ? `\n\n【当前题目】\n${questionText}\n\n【正确答案/解题步骤】\n${solutionText}`
      : `\n\n[Current Question]\n${questionText}\n\n[Correct Answer/Solution]\n${solutionText}`;
  }

  /**
   * Send a message to the AI and get a response
   */
  async sendMessage(userText) {
    if (this.isLoading) return null;
    this.isLoading = true;

    const lang = i18n.getLang();
    const userMsg = {
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    };
    this.messages.push(userMsg);

    try {
      const response = await this.callAPI(userText);
      const botMsg = {
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      this.messages.push(botMsg);
      return botMsg;
    } catch (e) {
      console.error('AI API Error:', e);
      const errorMsg = {
        role: 'assistant',
        content: i18n.t('aiError'),
        timestamp: Date.now(),
        error: true,
      };
      this.messages.push(errorMsg);
      return errorMsg;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Call the OpenAI-compatible API
   */
  async callAPI(userText) {
    const url = `${API_CONFIG.baseUrl}/v1/chat/completions`;

    // Build messages array
    const apiMessages = [
      { role: 'system', content: this.getSystemPrompt() },
    ];

    // Add question context if available
    const ctx = this.getQuestionContext();
    const systemWithCtx = this.getSystemPrompt() + ctx;

    apiMessages[0].content = systemWithCtx;

    // Add conversation history (last 10 messages to keep context manageable)
    const history = this.messages.slice(-10);
    history.forEach(m => {
      apiMessages.push({ role: m.role, content: m.content });
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: API_CONFIG.model,
        messages: apiMessages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * Open/close the drawer
   */
  toggle() {
    this.isOpen = !this.isOpen;
    return this.isOpen;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  /**
   * Get welcome message
   */
  getWelcomeMessage() {
    return {
      role: 'assistant',
      content: i18n.t('aiWelcome'),
      timestamp: Date.now(),
    };
  }

  /**
   * Clear conversation
   */
  clearConversation() {
    this.messages = [];
  }
}

const aiAssistant = new AIAssistant();