const getAvatar = (name = "User") => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=111111&color=ffffff&bold=true`;
};

export default getAvatar;