function Button({ text, link }) {
  return (
    <a
      href={link}
      className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
    >
      {text}
    </a>
  )
}

export default Button
