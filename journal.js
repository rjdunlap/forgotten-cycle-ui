/**
 * Journal Entry Modal Functionality
 * Handles opening and closing the journal entry modal
 */

// Journal entries data structure
const journalEntries = {
  "1": {
    "title": "A lone tree",
    "date": "Day 1",
    "content": "<p>You wake up in the dim light of dawn, lying in the damp grass just outside the edge of town. Your head aches, your memories scattered like leaves in the wind. Ahead, a lone tree stands—gnarled, stubborn, and strangely inviting. You clench your fist. For reasons you can't explain, you know exactly what you need to do: punch that tree.</p>",
    "requirement": [],
    "unlocks": ["Woodcutting", "Journal"]
  },
  "2": {
    "title": "Glinting Surface",
    "date": "Day 3",
    "content": "<p>With the last splintered blow, the tree crashes down, leaving a neat pile of logs at your feet. You gather them quickly, feeling a strange satisfaction. But your work isn't done. Not far off, a jagged rock catches your eye—its surface glinting faintly in the morning light. Without hesitation, you step forward and raise your fist. If there's copper inside, you're going to punch it out.</p>",
    "requirement": [{"Woodcutting": 1}],
    "unlocks": ["Mining", "Inventory", "Profile"]
  },
  "3": {
    "title": "Firemaking",
    "date": "Day 7",
    "content": "<p> Your fists ache, but the rock finally yields, crumbling to reveal rough chunks of copper ore. You gather them carefully, their weight promising something more. But raw ore won't be enough—you'll need fire, and fuel to feed it. Glancing at your pile of logs, you know what must be done: it's time to burn the wood down to charcoal, the first step toward smelting the metal hidden within.</p>",
    "requirement": [{"Mining" : 1}],
    "unlocks": ["Firemaking"]
  },
  "4": {
    "title": "Fuel in your grasp",
    "date": "Day 12",
    "content": "<p>The last of the flames die down, leaving a bed of warm ash and solid chunks of charcoal. You brush them free, feeling their brittle strength in your hands. It's ready. With the ore beside you and the fuel in your grasp, a quiet determination settles over you. The time has come to build a fire hot enough to melt stone—to smelt the copper and forge the beginning of something greater.</p>",
    "requirement": [{"Firemaking" : 1}],
    "unlocks": ["Smelting"]
  },
  "5": {
    "title": "Heat of the forge",
    "date": "Day 18",
    "content": "<p>The copper glows as it cools, solidifying into a rough, gleaming bar. You heft it, feeling its potential thrumming beneath the surface. It's not just metal—it's a choice. With the heat of the forge still burning, you turn it over in your hands, imagining what it could become. A hatchet to fell more trees, a pickaxe to break tougher stone, or a hammer to shape the world ahead. The decision is yours.</p>",
    "requirement": [{"Smelting" : 1}],
    "unlocks": ["Smithing"]
  },
  "6": {
    "title": "Ashwrighting",
    "date": "Day 25",
    "content": "<p>After forging dozens of tools, each swing of your hammer feels heavier, each creation falling short of what you imagined. The hatchet dulls too quickly, the pickaxe chips on harder stone, the hammer leaves shallow marks. It's not your skill—it's the material. The copper alone isn't enough. But as you stare into the dying embers, an idea sparks. The mana crystal fragments you've gathered… what if their power could be fused with the metal?</p>",
    "requirement": [{"Smithing" : 1}],
    "unlocks": ["Ashwrighting"]
  },
  "7": {
    "title": "Ashen Forging",
    "date": "Day 30",
    "content": "<p>Slowly, deliberately, you stir the molten blend, watching as faint arcs of energy ripple through the glowing liquid. From the ashes of failure, from scraps and shards, you now have enough. This is the moment of reforging—a chance to shape something stronger, something touched by power beyond mere metal.</p>",
    "requirement": [{"Ashwrighting" : 1}],
    "unlocks": ["Ashen Forging"]
  },
  "8": {
    "title": "Meditation",
    "date": "Day 42",
    "content": "<p>IThe moments stretch, slow and unhurried. You pause, feeling the weight of the stillness around you—the warmth of the sun, the cool press of the earth, the gentle rise and fall of your breath. With nothing demanding your hands, your mind sharpens, settling into calm. You've discovered meditation, a place where even in rest, you're gathering patience and quiet resolve.</p>",
    "requirement": [{"Idle" : "30 Minutes"}], //30 minutes
    "unlocks": ["Meditation"]
  },
  "9": {
    "title": "Mana Sense",
    "date": "Day 50",
    "content": "<p>As time drifts by, you find yourself slipping deeper into the quiet rhythm—the soft rustle of the wind, the distant sounds of life, the gentle rise and fall of your breath. Without meaning to, you ease into stillness. But this time, something stirs beneath the calm: a faint shimmer at the edge of your senses, a quiet pulse you hadn't noticed before. You breathe, focus, and the veil begins to lift. A new awareness blooms within you—mana sense. The world is no longer just sound and shape; now you can feel the hidden currents of energy flowing through all things, waiting for your touch.</p>",
    "requirement": [{"Meditation" : 25}],
    "unlocks": ["Mana Sense"]
  },
  "10": {
    "title": "Too Deep",
    "date": "Day 63",
    "content": "<p>While working deep in the mine today, I heard a voice calling my name. It seemed to come from the very stone itself, resonating with a frequency that made my tools vibrate.</p><p>I followed the sound to a wall of black stone that wasn't there yesterday. On its surface were symbols that shifted and changed as I watched. When I touched it, visions flooded my mind - a great city of impossible architecture, beings of pure energy, and a darkness that consumed all.</p>",
    "requirement": [{"Mining": 90}],
    "unlocks": []
  }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Populate journal entries with titles
  populateJournalEntries();
  
  // Add click handlers to all journal entries
  const journalEntryElements = document.querySelectorAll('.journal-entry');
  journalEntryElements.forEach(entry => {
    entry.addEventListener('click', function() {
      const entryId = this.dataset.entryId;
      openEntryModal(entryId);
    });
  });
  
  // Close modal when clicking outside of it
  const entryModal = document.getElementById('entryModal');
  if (entryModal) {
    entryModal.addEventListener('click', function(event) {
      if (event.target === this) {
        closeEntryModal();
      }
    });
  }
  
  // Close button functionality
  const closeButton = document.querySelector('#entryModal button');
  if (closeButton) {
    closeButton.addEventListener('click', closeEntryModal);
  }
});

// Example player profile object
const playerProfile = {
  "Woodcutting": 1,
  "Mining": 1,
  "Firemaking": 0,
  "Smelting": 0,
  "Smithing": 0,
  "Ashwrighting": 0,
  "Ashen Forging": 0,
  "Idle": 0,
  "Meditation": 0
};

/**
 * Populates the journal entries container with entries from the journalEntries object
 */
function populateJournalEntries() {
  const container = document.getElementById('journalEntriesContainer');
  if (!container) return;
  
  // Clear existing entries
  container.innerHTML = '';
  
  // Create entries for each item in journalEntries
  Object.keys(journalEntries).forEach(entryId => {
    const entry = journalEntries[entryId];
    const entryElement = document.createElement('div');
    entryElement.className = 'relative bg-bg-primary p-1.5 rounded border border-button-bg hover:border-button-light cursor-pointer journal-entry';
    entryElement.dataset.entryId = entryId;

    // Check requirements
    const requirementsMet = meetsRequirements(entry.requirement, playerProfile);

    const titleSpan = document.createElement('span');
    titleSpan.className = 'text-text-primary';
    titleSpan.textContent = requirementsMet ? entry.title : "???";
    entryElement.appendChild(titleSpan);

    // Requirement text display removed from here
    container.appendChild(entryElement);
  });
}

/**
 * Opens the journal entry modal with the specified entry content
 * @param {string} entryId - The ID of the journal entry to display
 */
function openEntryModal(entryId) {
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const entryModal = document.getElementById('entryModal');

  if (modalTitle && modalContent && entryModal) {
    const entry = journalEntries[entryId];

    if (entry) {
      const requirementsMet = meetsRequirements(entry.requirement, playerProfile);

      modalTitle.textContent = requirementsMet ? entry.title : "???";
      entryModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      let requirementTextHtml = '';
      let requirementListHtml = '';
      if (entry.requirement && entry.requirement.length > 0) {
        if (Array.isArray(entry.requirement)) {
          if (entry.requirement.length > 0) {
            const reqTexts = [];
            const reqListItems = [];

            entry.requirement.forEach(req => {
              const key = Object.keys(req)[0];
              if (key) {
                const reqText = `${key} ${req[key]}`;
                reqTexts.push(reqText);
                reqListItems.push(`<li class="text-text-primary">${reqText}</li>`);
              }
            });

            const reqTextContent = reqTexts.join(', ');
            requirementTextHtml = `<div class="text-sm text-text-heading mb-1">Requires: ${reqTextContent}</div>`;
            requirementListHtml = `
              <p class="mb-2">Needs prerequisite:</p>
              <ul class="list-disc pl-5 text-text-primary mb-4">
                ${reqListItems.join('')}
              </ul>
            `;
          }
        } else if (typeof entry.requirement === 'string') {
          requirementTextHtml = `<div class="text-sm text-text-heading mb-1">Requires: ${entry.requirement}</div>`;
          requirementListHtml = `
            <p class="mb-2">Needs prerequisite:</p>
            <ul class="list-disc pl-5 text-text-primary mb-4">
              <li class="text-text-primary">${entry.requirement}</li>
            </ul>
          `;
        }
      }

      // Display the entry content
      modalContent.innerHTML = `
        <div class="text-text-primary">
        ${requirementsMet ?  requirementTextHtml : ""}
          ${requirementsMet ? `<div class="text-sm text-text-heading mb-2">${entry.date}</div>` : ""}
          ${requirementsMet ? entry.content : requirementListHtml}
        </div>
        ${requirementsMet && entry.unlocks && entry.unlocks.length > 0 ? `
        <div id="unlocksSection" class="mt-4 border-t border-text-heading pt-2">
          <h3 class="text-text-heading font-bold">Unlocks:</h3>
          <ul id="modalUnlocks" class="list-disc pl-5 text-text-primary">
            ${entry.unlocks.map(unlock => `<li class="text-text-primary">${unlock}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
      `;

    } else {
      // Fallback for entries not in our database
      modalTitle.textContent = `Entry ${entryId}`;
      entryModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      
      modalContent.innerHTML = `
        <div class="text-text-primary">
          <p>This journal entry has not been discovered yet.</p>
        </div>
      `;
      
      const unlocksSection = document.getElementById('unlocksSection');
      if (unlocksSection) {
        unlocksSection.classList.add('hidden');
      }
    }
  }
}

/**
 * Closes the journal entry modal
 */
function closeEntryModal() {
  const entryModal = document.getElementById('entryModal');
  if (entryModal) {
    entryModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

function meetsRequirements(requirements, profile) {
  if (!requirements || requirements.length === 0) return true;
  return requirements.every(req => {
    const key = Object.keys(req)[0];
    const value = req[key];
    // If the requirement is a number, compare numerically
    if (typeof value === "number") {
      return (profile[key] || 0) >= value;
    }
    // If the requirement is a string (e.g., "30 Minutes"), always fail unless you add logic for this
    return false;
  });
}