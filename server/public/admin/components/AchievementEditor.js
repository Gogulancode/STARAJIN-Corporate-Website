// Achievement Section Editor Component
function createAchievementEditor(section, updateCallback) {
    return `
        <div class="space-y-6" x-data="achievementEditor(${JSON.stringify(section).replace(/"/g, '&quot;')})">
            <!-- Heading -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Heading</label>
                <input type="text" 
                       x-model="content.title"
                       @input="updateSection()"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
            </div>

            <!-- Subheading -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Subheading</label>
                <input type="text" 
                       x-model="content.subtitle"
                       @input="updateSection()"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
            </div>

            <!-- Variant -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Layout</label>
                <select x-model="config.variant" @change="updateSection()" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                    <option value="grid">Grid Layout</option>
                    <option value="list">List Layout</option>
                </select>
            </div>

            <!-- Achievement Categories -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <label class="block text-sm font-medium text-gray-700">Achievement Categories</label>
                    <button @click="addCategory()" 
                            class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add Category
                    </button>
                </div>

                <div class="space-y-4">
                    <template x-for="(category, categoryIndex) in content.categories" :key="categoryIndex">
                        <div class="border rounded-lg p-4 bg-gray-50">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-medium text-gray-900">Category</h4>
                                <div class="flex items-center space-x-2">
                                    <button @click="moveCategoryUp(categoryIndex)" :disabled="categoryIndex === 0"
                                            class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                                        </svg>
                                    </button>
                                    <button @click="moveCategoryDown(categoryIndex)" :disabled="categoryIndex === content.categories.length - 1"
                                            class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                    <button @click="removeCategory(categoryIndex)" 
                                            class="p-1 text-red-400 hover:text-red-600">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Category Header -->
                            <div class="mb-3">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                                <input type="text" 
                                       x-model="category.name"
                                       @input="updateSection()"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                            </div>

                            <!-- Achievement Points -->
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <label class="block text-sm font-medium text-gray-700">Achievements</label>
                                    <button @click="addAchievement(categoryIndex)" 
                                            class="text-starajin-blue hover:text-starajin-blue/80 text-xs flex items-center">
                                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                        Add Achievement
                                    </button>
                                </div>

                                <div class="space-y-2">
                                    <template x-for="(achievement, achievementIndex) in category.achievements" :key="achievementIndex">
                                        <div class="flex items-center space-x-2">
                                            <input type="text" 
                                                   x-model="achievement"
                                                   @input="updateAchievement(categoryIndex, achievementIndex, $event.target.value)"
                                                   placeholder="Achievement description"
                                                   class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                            <button @click="removeAchievement(categoryIndex, achievementIndex)" 
                                                    class="p-2 text-red-400 hover:text-red-600">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <!-- CTAs -->
            <div>
                <div class="flex items-center justify-between mb-4">
                    <label class="block text-sm font-medium text-gray-700">Call-to-Action Buttons</label>
                    <button @click="addCTA()" 
                            class="text-starajin-blue hover:text-starajin-blue/80 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add CTA
                    </button>
                </div>

                <div class="space-y-3">
                    <template x-for="(cta, ctaIndex) in content.ctas" :key="ctaIndex">
                        <div class="flex items-center space-x-2">
                            <input type="text" 
                                   x-model="cta.text"
                                   @input="updateSection()"
                                   placeholder="Button text"
                                   class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                            <input type="text" 
                                   x-model="cta.href"
                                   @input="updateSection()"
                                   placeholder="Link URL"
                                   class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                            <select x-model="cta.style" @change="updateSection()" 
                                    class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-starajin-blue">
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                            <button @click="removeCTA(ctaIndex)" 
                                    class="p-2 text-red-400 hover:text-red-600">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    `;
}

function achievementEditor(initialSection) {
    return {
        content: initialSection.content || {
            title: '',
            subtitle: '',
            categories: [],
            ctas: []
        },
        config: initialSection.config || {
            variant: 'grid'
        },

        addCategory() {
            this.content.categories.push({
                name: '',
                achievements: ['']
            });
            this.updateSection();
        },

        removeCategory(index) {
            this.content.categories.splice(index, 1);
            this.updateSection();
        },

        moveCategoryUp(index) {
            if (index > 0) {
                [this.content.categories[index], this.content.categories[index - 1]] = 
                [this.content.categories[index - 1], this.content.categories[index]];
                this.updateSection();
            }
        },

        moveCategoryDown(index) {
            if (index < this.content.categories.length - 1) {
                [this.content.categories[index], this.content.categories[index + 1]] = 
                [this.content.categories[index + 1], this.content.categories[index]];
                this.updateSection();
            }
        },

        addAchievement(categoryIndex) {
            this.content.categories[categoryIndex].achievements.push('');
            this.updateSection();
        },

        removeAchievement(categoryIndex, achievementIndex) {
            this.content.categories[categoryIndex].achievements.splice(achievementIndex, 1);
            this.updateSection();
        },

        updateAchievement(categoryIndex, achievementIndex, value) {
            this.content.categories[categoryIndex].achievements[achievementIndex] = value;
            this.updateSection();
        },

        addCTA() {
            this.content.ctas.push({
                text: '',
                href: '',
                style: 'primary'
            });
            this.updateSection();
        },

        removeCTA(index) {
            this.content.ctas.splice(index, 1);
            this.updateSection();
        },

        updateSection() {
            // This would trigger a parent component update
            if (window.updateSectionCallback) {
                window.updateSectionCallback(this.content, this.config);
            }
        }
    }
}
