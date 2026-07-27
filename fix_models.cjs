const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = glob.sync('src/server/modules/**/*.model.ts');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/export default \(mongoose\.models\.[A-Za-z]+ as mongoose\.Model<any>\) \|\| mongoose\.model<([A-Za-z]+)>\("([A-Za-z]+)", ([A-Za-z]+Schema)\);/, 
    'const Model = (mongoose.models.$2 as mongoose.Model<$1>) || mongoose.model<$1>("$2", $3);\nexport default Model;');
  content = content.replace(/const User = mongoose\.models\.User \|\| mongoose\.model<IUser>\("User", userSchema\);\nexport default User;/, 
    'const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", userSchema);\nexport default User;');
  fs.writeFileSync(file, content);
});
