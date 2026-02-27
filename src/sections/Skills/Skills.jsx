import { useLang } from '../../context/LangContext';
import { t } from '../../translations';

const groupColors = [
  "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300",
  "bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300",
  "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300",
  "bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300",
]

function Skills() {
  const { lang } = useLang()
  const tr = t[lang].skills

  return (
    <section id="skills" className="">
      <div className="w-full max-w-none px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">{tr.title}</h2>

        <div className="flex flex-col gap-6 mb-10">
          {tr.groups.map(({ category, skills }, i) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                {category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li key={skill} className={`px-3 py-1.5 rounded-full text-sm font-medium ${groupColors[i]}`}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
            {tr.softTitle}
          </h3>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1.5 text-sm">
            {tr.soft.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Skills
