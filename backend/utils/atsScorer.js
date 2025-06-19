function scoreResume(text, jd = '') {
  return new Promise((resolve) => {
    const lowerText = text.toLowerCase();
    const lowerJD = jd.toLowerCase();

    const sections = {
      experience: /experience[\s\S]{0,100}/i.test(text) ? 1 : 0,
      skills: /skills[\s\S]{0,100}/i.test(text) ? 1 : 0,
      education: /education[\s\S]{0,100}/i.test(text) ? 1 : 0,
    };

    const sectionScores = {
      experience: sections.experience ? 80 : 40,
      skills: sections.skills ? 70 : 30,
      education: sections.education ? 90 : 50,
    };

    // Keyword Match %
    const jdKeywords = lowerJD
      .split(/\W+/)
      .filter(word => word.length > 4); // Filter out short/common words
    let matchCount = 0;

    jdKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) matchCount++;
    });

    const keywordMatch = jdKeywords.length > 0
      ? Math.round((matchCount / jdKeywords.length) * 100)
      : 0;

    // Grammar Heuristic (very basic)
    const sentences = text.split(/[.?!]/).filter(Boolean);
    const grammarErrors = sentences.filter(s => s.trim().length > 0 && !/[A-Z]/.test(s.trim()[0]));
    const grammarCheck = grammarErrors.length > 3
      ? "Several grammar issues found"
      : grammarErrors.length > 0
        ? "Minor errors found"
        : "Looks good";

    // Score Calculation (simple weighted avg)
    const sectionAvg = (sectionScores.experience + sectionScores.skills + sectionScores.education) / 3;
    const score = Math.round((sectionAvg * 0.6) + (keywordMatch * 0.3) + ((100 - grammarErrors.length * 10) * 0.1));

    // Suggestions
    const suggestions = [];
    if (!sections.experience) suggestions.push('Add an Experience section.');
    if (!sections.skills) suggestions.push('Add a Skills section.');
    if (!sections.education) suggestions.push('Add an Education section.');
    if (text.length < 600) suggestions.push('Expand on your resume content.');
    if (keywordMatch < 50) suggestions.push('Add more technical keywords from the job description.');
    if (grammarCheck !== "Looks good") suggestions.push(grammarCheck);

    resolve({
      score,
      keywordMatch,
      sectionScores,
      grammarCheck,
      suggestions,
    });
  });
}

module.exports = { scoreResume };
