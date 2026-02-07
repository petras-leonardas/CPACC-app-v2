const fs = require('fs');
const path = require('path');

// Same mapping as functions/api/questions.ts
const subCategoryToTopicMap = {
  '1A': '1a-theoretical-models',
  '1B': '1b-categories-characteristics',
  '1C': '1c-assistive-technologies',
  '1D': '1d-demographics-statistics',
  '1E': '1e-disability-etiquette',
  '2A': '2a-accommodations-universal-design',
  '2B': '2b-benefits-accessibility',
  '2C': '2c-wcag-principles',
  '2D': '2d-built-environment',
  '2E': '2e-universal-design-principles',
  '2F': '2f-udl-ux',
  '3A': '3a-international-conventions',
  '3B': '3b-regional-instruments',
  '3C': '3c-national-provincial',
  '3D': '3d-procurement-laws',
  '3E': '3e-ict-standards',
  '3F': '3f-integrating-ict',
};

function parseSqlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.startsWith('INSERT INTO'));
  
  const questions = [];
  
  for (const line of lines) {
    // Extract the VALUES portion
    const valuesMatch = line.match(/VALUES\s*\((.+)\);$/);
    if (!valuesMatch) {
      console.warn('Could not parse line:', line.substring(0, 80));
      continue;
    }
    
    const valuesStr = valuesMatch[1];
    
    // Parse SQL values - handle quoted strings with escaped single quotes
    const fields = [];
    let current = '';
    let inString = false;
    let i = 0;
    
    while (i < valuesStr.length) {
      const char = valuesStr[i];
      
      if (!inString) {
        if (char === "'") {
          inString = true;
          i++;
          continue;
        } else if (char === ',') {
          fields.push(current.trim());
          current = '';
          i++;
          continue;
        } else {
          current += char;
          i++;
        }
      } else {
        // Inside a quoted string
        if (char === "'" && i + 1 < valuesStr.length && valuesStr[i + 1] === "'") {
          // Escaped single quote
          current += "'";
          i += 2;
        } else if (char === "'") {
          // End of string
          inString = false;
          i++;
        } else {
          current += char;
          i++;
        }
      }
    }
    // Push last field
    if (current.trim()) {
      fields.push(current.trim());
    }
    
    if (fields.length < 12) {
      console.warn(`Expected 12 fields, got ${fields.length} for ID ${fields[0]}`);
      continue;
    }
    
    const [
      id,
      _domainCategory,
      _domainCategoryName,
      domainSubCategory,
      _domainSubCategoryName,
      subject,
      question,
      correctAnswer,
      falseAnswer1,
      falseAnswer2,
      falseAnswer3,
      rationale
    ] = fields;
    
    const topicId = subCategoryToTopicMap[domainSubCategory];
    if (!topicId) {
      console.warn(`Unknown sub-category: ${domainSubCategory} for ID ${id}`);
      continue;
    }
    
    questions.push({
      id: `q${id}`,
      topicId,
      question,
      options: [correctAnswer, falseAnswer1, falseAnswer2, falseAnswer3],
      correctAnswer: 0, // Always index 0 — frontend shuffleQuestionOptions handles randomization
      explanation: rationale,
      subject,
    });
  }
  
  return questions;
}

function generateQuestionCounts(questions) {
  const counts = {};
  for (const q of questions) {
    // Map topicId back to sub-category code for counts
    const subCat = Object.entries(subCategoryToTopicMap).find(([, v]) => v === q.topicId);
    if (subCat) {
      counts[subCat[0]] = (counts[subCat[0]] || 0) + 1;
    }
  }
  return counts;
}

function escapeForTypeScript(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

// Convert topicId to a variable-safe export name, e.g. '1a-theoretical-models' -> 'questions_1a'
function topicIdToVarName(topicId) {
  const code = topicId.substring(0, 2); // e.g. '1a'
  return `questions_${code}`;
}

function generateTopicFile(topicId, topicQuestions) {
  let output = `import type { Question } from './types'\n\n`;
  const varName = topicIdToVarName(topicId);
  output += `export const ${varName}: Question[] = [\n`;
  
  for (const q of topicQuestions) {
    output += `  {\n`;
    output += `    id: '${q.id}',\n`;
    output += `    topicId: '${q.topicId}',\n`;
    output += `    question: '${escapeForTypeScript(q.question)}',\n`;
    output += `    options: [\n`;
    for (const opt of q.options) {
      output += `      '${escapeForTypeScript(opt)}',\n`;
    }
    output += `    ],\n`;
    output += `    correctAnswer: ${q.correctAnswer},\n`;
    output += `    explanation: '${escapeForTypeScript(q.explanation)}',\n`;
    output += `    subject: '${escapeForTypeScript(q.subject)}',\n`;
    output += `  },\n`;
  }
  
  output += `]\n`;
  return output;
}

function generateTypesFile() {
  let output = `export interface Question {\n`;
  output += `  id: string\n`;
  output += `  topicId: string\n`;
  output += `  question: string\n`;
  output += `  options: string[]\n`;
  output += `  correctAnswer: number // index of correct option (0-3)\n`;
  output += `  explanation?: string\n`;
  output += `  subject?: string\n`;
  output += `}\n`;
  return output;
}

function generateBarrelIndex(topicIds) {
  let output = `/**\n`;
  output += ` * Barrel index — combines all per-topic question files\n`;
  output += ` * To regenerate: node scripts/generate-questions-from-sql.cjs\n`;
  output += ` */\n`;
  output += `export type { Question } from './types'\n\n`;
  
  // Import each topic
  for (const topicId of topicIds) {
    const varName = topicIdToVarName(topicId);
    output += `import { ${varName} } from './${topicId}'\n`;
  }
  
  output += `\n`;
  
  // Combine into ALL_QUESTIONS
  const varNames = topicIds.map(t => topicIdToVarName(t));
  output += `export const ALL_QUESTIONS = [\n`;
  for (const varName of varNames) {
    output += `  ...${varName},\n`;
  }
  output += `]\n\n`;
  
  // Derive QUESTION_COUNTS from array lengths
  output += `/**\n`;
  output += ` * Question counts by sub-category code (e.g. '1A', '2B')\n`;
  output += ` * Derived from per-topic array lengths — always in sync\n`;
  output += ` */\n`;
  output += `export const QUESTION_COUNTS: Record<string, number> = {\n`;
  
  for (const topicId of topicIds) {
    const varName = topicIdToVarName(topicId);
    const code = topicId.substring(0, 2).toUpperCase();
    output += `  '${code}': ${varName}.length,\n`;
  }
  
  output += `}\n`;
  
  return output;
}

// Main
const sqlFilePath = path.join(__dirname, '..', 'sync-import.sql');
const outputDir = path.join(__dirname, '..', 'src', 'data', 'questions');

console.log('📖 Reading sync-import.sql...');
const questions = parseSqlFile(sqlFilePath);
console.log(`✅ Parsed ${questions.length} questions\n`);

// Group questions by topicId
const questionsByTopic = {};
for (const q of questions) {
  if (!questionsByTopic[q.topicId]) {
    questionsByTopic[q.topicId] = [];
  }
  questionsByTopic[q.topicId].push(q);
}

const topicIds = Object.keys(questionsByTopic).sort();

console.log('📊 Question distribution:');
for (const topicId of topicIds) {
  const code = topicId.substring(0, 2).toUpperCase();
  console.log(`   ${code}: ${questionsByTopic[topicId].length} questions → ${topicId}.ts`);
}
console.log(`   Total: ${questions.length}\n`);

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate types.ts
console.log('📝 Generating files...');
const typesContent = generateTypesFile();
fs.writeFileSync(path.join(outputDir, 'types.ts'), typesContent, 'utf-8');
console.log(`   ✅ types.ts`);

// Generate per-topic files
for (const topicId of topicIds) {
  const content = generateTopicFile(topicId, questionsByTopic[topicId]);
  fs.writeFileSync(path.join(outputDir, `${topicId}.ts`), content, 'utf-8');
  console.log(`   ✅ ${topicId}.ts (${questionsByTopic[topicId].length} questions)`);
}

// Generate barrel index
const indexContent = generateBarrelIndex(topicIds);
fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent, 'utf-8');
console.log(`   ✅ index.ts (barrel)\n`);

// Validation
const expectedTotal = 254;
if (questions.length !== expectedTotal) {
  console.error(`❌ MISMATCH: Expected ${expectedTotal} questions, got ${questions.length}`);
  process.exit(1);
}

console.log(`✅ Generated ${topicIds.length + 2} files (${topicIds.length} topics + types.ts + index.ts)`);
console.log(`✅ Validation passed: ${questions.length} questions (expected ${expectedTotal})`);
